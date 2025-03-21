import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Image } from 'react-bootstrap';
import { apiToken, baseURL } from '../../services/config.ts';

interface TaskCommentReply {
    author: string;
    avatar: string;
    text: string;
}

interface TaskComment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    reply?: TaskCommentReply;
}

interface CommentSectionProps {
    comments: TaskComment[];
    taskId: string;
}

interface TaskCommentAPIResponse {
    id: number;
    text: string;
    author_nickname: string;
    author_avatar: string;
    sub_comments?: {
        author_nickname: string;
        author_avatar: string;
        text: string;
    }[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, taskId }) => {
    const [updatedComments, setUpdatedComments] = useState<TaskComment[]>(comments);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    useEffect(() => {
        fetchComments();
    }, [taskId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}/comments`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const data: TaskCommentAPIResponse[] = await response.json();

            const transformedComments: TaskComment[] = data.map((comment) => {
                const firstReply = comment.sub_comments && comment.sub_comments[0];

                return {
                    id: comment.id,
                    text: comment.text,
                    author: comment.author_nickname,
                    avatar: comment.author_avatar,
                    reply: firstReply
                        ? {
                            author: firstReply.author_nickname,
                            avatar: firstReply.author_avatar,
                            text: firstReply.text,
                        }
                        : undefined,
                };
            });

            setUpdatedComments(transformedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        const newEntry = {
            text: newComment,
        };

        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify(newEntry),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const data: TaskCommentAPIResponse = await response.json();

            const formattedComment: TaskComment = {
                id: data.id,
                text: data.text,
                author: data.author_nickname,
                avatar: data.author_avatar,
            };

            setUpdatedComments([formattedComment, ...updatedComments]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleReply = async (commentId: number) => {
        const replyContent = replyText[commentId];

        if (!replyContent?.trim()) return;

        const replyData = {
            text: replyContent,
            parent_id: commentId,
        };

        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) {
                throw new Error('Failed to post reply');
            }

            const data: TaskCommentAPIResponse = await response.json();

            const updatedCommentsList = updatedComments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        reply: {
                            author: data.author_nickname,
                            avatar: data.author_avatar,
                            text: data.text,
                        },
                    };
                }
                return comment;
            });

            setUpdatedComments(updatedCommentsList);
            setReplyingTo(null);
            setReplyText((prev) => ({ ...prev, [commentId]: '' }));
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    const countAllComments = (comments: TaskComment[]): number => {
        let count = 0;

        comments.forEach((comment) => {
            count += 1;
            if (comment.reply) {
                count += 1;
            }
        });

        return count;
    };

    return (
        <div className="container py-5 px-4 comments-container">
            <Card className="mb-4">
                <Card.Body className="p-0">
                    <div style={{ position: 'relative' }}>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="დაწერე კომენტარი"
                                className="add-comment-input"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={handleAddComment}
                            className="comment-btn"
                        >
                            დააკომენტარე
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <div className="d-flex gap-2 mb-2 align-items-center">
        <span>
          <h4 className="comments-section-subtitle m-0">კომენტარები</h4>
        </span>
                <span>
          <Button className="comment-count-btn">
            {countAllComments(updatedComments)}
          </Button>
        </span>
            </div>

            {updatedComments.map((comment) => (
                <Card className="mb-3 bg-transparent border-0" key={comment.id}>
                    <Card.Body>
                        <div className="d-flex mb-2">
                            <Image
                                src={comment.avatar}
                                roundedCircle
                                width={40}
                                height={40}
                                className="me-2"
                            />
                            <div>
                                <strong>{comment.author}</strong>
                                <p className="mb-1">{comment.text}</p>
                            </div>
                        </div>

                        {!comment.reply && (
                            <>
                                {replyingTo === comment.id ? (
                                    <div className="mt-2">
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="პასუხის დაწერა..."
                                                value={replyText[comment.id] || ''}
                                                onChange={(e) =>
                                                    setReplyText((prev) => ({
                                                        ...prev,
                                                        [comment.id]: e.target.value,
                                                    }))
                                                }
                                            />
                                        </Form.Group>
                                        <div className="mt-2">
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => handleReply(comment.id)}
                                                className="comment-btn"
                                            >
                                                პასუხი
                                            </Button>{' '}
                                            <Button
                                                size="sm"
                                                className="cancel-btn"
                                                onClick={() => setReplyingTo(null)}
                                            >
                                                გაუქმება
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 d-flex align-items-center answer-btn"
                                        onClick={() => setReplyingTo(comment.id)}
                                    >
                    <span className="me-2">
                      <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7944_1684)">
                          <path
                              d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z"
                              fill="#8338EC"
                          />
                          <path
                              d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z"
                              fill="#8338EC"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7944_1684">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                                        პასუხი
                                    </Button>
                                )}
                            </>
                        )}

                        {comment.reply && (
                            <Card className="mt-3 ms-5 bg-transparent border-0">
                                <Card.Body className="border-none">
                                    <div className="d-flex">
                                        <Image
                                            src={comment.reply.avatar}
                                            roundedCircle
                                            width={30}
                                            height={30}
                                            className="me-2"
                                        />
                                        <div>
                                            <strong>{comment.reply.author}</strong>
                                            <p className="mb-0">{comment.reply.text}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default CommentSection;
