import React, { useState } from 'react';
import { Card, Button, Form, Image } from 'react-bootstrap';


interface Comment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    reply?: {
        author: string;
        avatar: string;
        text: string;
    };
}

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: 'ემილია მოკრაძე',
            avatar: 'https://s3-alpha-sig.figma.com/img/1c5e/c247/b896699df03f473ef6c1459dfc2e3453?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mPl67SvDwfV5k-AvjXssnxqyzlAskDz1L9eQZMykJ3GowzQZscEp4fRcVlrCdN58vRn8tVnCDF49sQqQOq1Ej7hQ3TSoRDBWuXMxs2XfH19f8bhB80a0pPF8s1Msp5G0-Xcaw3iq6I3qb~Ct4t2zkCLo6kIkrgGp8-3eMjA5mwtQhicoxVFNzDMCM~8V0RciEYcqoMERksJuX81XbNmeqCB57laqsCohQCuOBrU2EAUSwuuDsKXpp2EEKJGgCgTie46J1jYe7Ov9M15ZsgUE3JXsvNoFX2gMTRwKNct3OX0NQYloHdcOLc139aNgMUt5xW0VMsn8iRCPjLDG~lzypg__',
            text: 'ძალიან სასიამოვნო ჩანს, მადლობა კომენტარისთვის!',
        },
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const newEntry: Comment = {
            id: comments.length + 1,
            author: 'ნატალია გიორგაძე',
            avatar: 'https://s3-alpha-sig.figma.com/img/1c5e/c247/b896699df03f473ef6c1459dfc2e3453?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mPl67SvDwfV5k-AvjXssnxqyzlAskDz1L9eQZMykJ3GowzQZscEp4fRcVlrCdN58vRn8tVnCDF49sQqQOq1Ej7hQ3TSoRDBWuXMxs2XfH19f8bhB80a0pPF8s1Msp5G0-Xcaw3iq6I3qb~Ct4t2zkCLo6kIkrgGp8-3eMjA5mwtQhicoxVFNzDMCM~8V0RciEYcqoMERksJuX81XbNmeqCB57laqsCohQCuOBrU2EAUSwuuDsKXpp2EEKJGgCgTie46J1jYe7Ov9M15ZsgUE3JXsvNoFX2gMTRwKNct3OX0NQYloHdcOLc139aNgMUt5xW0VMsn8iRCPjLDG~lzypg__',
            text: newComment,
        };

        setComments([newEntry, ...comments]);
        setNewComment('');
    };

    const handleReply = (commentId: number) => {
        if (!replyText[commentId]?.trim()) return;

        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    reply: {
                        author: 'ემილია მორგანი',
                        avatar: 'https://s3-alpha-sig.figma.com/img/194d/b135/df3d44bdfa4f48df0eb8b24c0e29a485?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=McBM1NO5x~Ik3pW6Xa~8OQDhJs6pL~RHxWB7J~q5QkDczsGSDrGZ4lJyaOjfUKtyy0p4MAXBYZWGxTpWJX3PDO89HmnK~XR5VV7aOx3Y13DDZRDRC7h~5MhWQ~3atq-u-7JORvpcP3KP9Lj34n8DUSDZy9qlJpiyjMaIGFtGrp3Wd7rhOwS1GvmRS3VX2dwvtEy2xjVWSCbtEHHGQmNI88gIx-~D8mxTaBLmTA60WLaF4R2f5Tl~zLfzA~V54YsJHa7YOAZtivHyJP97sygirFTFtMG8pz~jdc8~th1HaqnBpET9ywzgdUd4Pra7HoqpKMPl2eWKKTWxdoy5wk4ebA__',
                        text: replyText[commentId],
                    },
                };
            }
            return comment;
        });

        setComments(updatedComments);
        setReplyingTo(null);
        setReplyText((prev) => ({ ...prev, [commentId]: '' }));
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

            <div className="d-flex gap-2 mb-2">
                <span>
                    <h4 className="comments-section-subtitle">კომენტარები</h4>
                </span>
                <span>
                    <Button className="comment-count-btn">
                        4
                    </Button>
                </span>
            </div>

            {comments.map((comment) => (
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
                                                variant="success"
                                                onClick={() => handleReply(comment.id)}
                                                className="comment-btn"
                                            >
                                                პასუხის დამატება
                                            </Button>{' '}
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
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
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_7944_1684)">
                                                <path d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z" fill="#8338EC"/>
                                                <path d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z" fill="#8338EC"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_7944_1684">
                                                <rect width="16" height="16" fill="white"/>
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
