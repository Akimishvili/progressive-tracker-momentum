import {Modal, Button, Form, Row, Col, ModalProps} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {ChangeEvent, useState} from "react";
import {useForm} from "react-hook-form";
import {Employee} from "../../types/types.ts";


const AddEmployeeModal = ({ show, handleClose, handleSave }: ModalProps) =>  {
    const { handleSubmit } = useForm<Employee>();

    const { watch } = useForm();
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleFormSubmit = (data: Employee) => {
        const formData = {
            firstName: data.firstName,
            lastName: data.lastName,
            avatar,
            department_id: data.department_id
        };
        handleSave(formData);
        handleClose();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setAvatar(null);
    };

    // Watch live fields for validation
    const firstNameValue = watch("firstName", "");
    const lastNameValue = watch("lastName", "");

    // Live validation checks
    const isFirstNameValid = firstNameValue.length >= 2 && firstNameValue.length <= 255;
    const isLastNameValid = lastNameValue.length >= 2 && lastNameValue.length <= 255;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <div className="d-flex justify-content-end p-4">
                {/* Close button */}
                <button type="button" className="custom-close-button" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                         className="bi bi-x" viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"   stroke="currentColor" stroke-width="0.5"/>
                    </svg>
                </button>

            </div>
            <Modal.Header className="custom-modal-header d-flex justify-content-center pt-4">
                <Modal.Title className="detail-page-title">თანამშრომლის დამატება</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Container className="d-flex gap-4 flex-column">
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label className="input-label">სახელი<span className="label-required">*</span></Form.Label>
                                    <Form.Control type="text" />
                                    <div>
                                        <div>
                                            <small style={{ color: isFirstNameValid ? "green" : "#6C757D" }}>
                                                <span className="me-1">
                                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.3327 1L4.99935 8.33333L1.66602 5" stroke="#6C757D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                                მინიმუმ 2 სიმბოლო
                                            </small>
                                        </div>
                                        <div>
                                            <small style={{ color: isFirstNameValid ? "green" : "#6C757D" }}>
                                                <span className="me-1">
                                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.3327 1L4.99935 8.33333L1.66602 5" stroke="#6C757D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                                მაქსიმუმ 255 სიმბოლო
                                            </small>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label className="input-label">გვარი<span className="label-required">*</span></Form.Label>
                                    <Form.Control type="text" />
                                    <div>
                                        <div>
                                            <small style={{ color: isLastNameValid ? "green" : "#6C757D" }}>
                                                <span className="me-1">
                                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.3327 1L4.99935 8.33333L1.66602 5" stroke="#6C757D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                                მინიმუმ 2 სიმბოლო
                                            </small>
                                        </div>
                                        <div>
                                            <small style={{ color: isLastNameValid ? "green" : "#6C757D" }}>
                                                <span className="me-1">
                                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.3327 1L4.99935 8.33333L1.66602 5" stroke="#6C757D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                                მაქსიმუმ 255 სიმბოლო
                                            </small>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="pb-2">
                                    <label className="input-label">ავატარი<span className="label-required">*</span></label>
                                </div>
                                <div className="upload-container upload-box">
                                    {!avatar ? (
                                        <label htmlFor="file-upload">
                                            <span>
                                                <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 12.75C12.48 12.75 11.25 11.52 11.25 10C11.25 8.48 12.48 7.25 14 7.25C15.52 7.25 16.75 8.48 16.75 10C16.75 11.52 15.52 12.75 14 12.75ZM14 8.75C13.31 8.75 12.75 9.31 12.75 10C12.75 10.69 13.31 11.25 14 11.25C14.69 11.25 15.25 10.69 15.25 10C15.25 9.31 14.69 8.75 14 8.75Z" fill="#343A40"/>
                                                    <path d="M20 24.75H14C8.57 24.75 6.25 22.43 6.25 17V11C6.25 5.57 8.57 3.25 14 3.25H18C18.41 3.25 18.75 3.59 18.75 4C18.75 4.41 18.41 4.75 18 4.75H14C9.39 4.75 7.75 6.39 7.75 11V17C7.75 21.61 9.39 23.25 14 23.25H20C24.61 23.25 26.25 21.61 26.25 17V12C26.25 11.59 26.59 11.25 27 11.25C27.41 11.25 27.75 11.59 27.75 12V17C27.75 22.43 25.43 24.75 20 24.75Z" fill="#343A40"/>
                                                    <path d="M23 10.7499C22.59 10.7499 22.25 10.4099 22.25 9.99994V3.99994C22.25 3.69994 22.43 3.41994 22.71 3.30994C22.99 3.19994 23.31 3.25994 23.53 3.46994L25.53 5.46994C25.82 5.75994 25.82 6.23994 25.53 6.52994C25.24 6.81994 24.76 6.81994 24.47 6.52994L23.75 5.80994V9.99994C23.75 10.4099 23.41 10.7499 23 10.7499Z" fill="#343A40"/>
                                                    <path d="M21.0004 6.74994C20.8104 6.74994 20.6204 6.67994 20.4704 6.52994C20.1804 6.23994 20.1804 5.75994 20.4704 5.46994L22.4704 3.46994C22.7604 3.17994 23.2404 3.17994 23.5304 3.46994C23.8204 3.75994 23.8204 4.23994 23.5304 4.52994L21.5304 6.52994C21.3804 6.67994 21.1904 6.74994 21.0004 6.74994Z" fill="#343A40"/>
                                                    <path d="M7.67029 21.7001C7.43029 21.7001 7.19029 21.5801 7.05029 21.3701C6.82029 21.0301 6.91029 20.5601 7.25029 20.3301L12.1803 17.0201C13.2603 16.3001 14.7503 16.3801 15.7303 17.2101L16.0603 17.5001C16.5603 17.9301 17.4103 17.9301 17.9003 17.5001L22.0603 13.9301C23.1203 13.0201 24.7903 13.0201 25.8603 13.9301L27.4903 15.3301C27.8003 15.6001 27.8403 16.0701 27.5703 16.3901C27.3003 16.7001 26.8203 16.7401 26.5103 16.4701L24.8803 15.0701C24.3803 14.6401 23.5403 14.6401 23.0403 15.0701L18.8803 18.6401C17.8203 19.5501 16.1503 19.5501 15.0803 18.6401L14.7503 18.3501C14.2903 17.9601 13.5303 17.9201 13.0203 18.2701L8.10029 21.5801C7.96029 21.6601 7.81029 21.7001 7.67029 21.7001Z" fill="#343A40"/>
                                                </svg>

                                            </span>
                                            <p>ატვირთეთ ფოტო</p>
                                        </label>
                                    ) : (
                                        <div className="preview-container">
                                            <img src={avatar} alt="Preview" className="preview-image" />
                                            <button
                                                className="delete-btn"
                                                type="button"
                                                onClick={handleRemoveImage}
                                            >
                                             <span>
                                                 <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.85" y="0.85" width="24.3" height="24.3" rx="12.15" fill="white"/>
                                                        <rect x="0.85" y="0.85" width="24.3" height="24.3" rx="12.15" stroke="#6C757D" stroke-width="0.3"/>
                                                        <path d="M7.75 9.5H8.91667H18.25" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M17.0837 9.49996V17.6666C17.0837 17.976 16.9607 18.2728 16.7419 18.4916C16.5232 18.7104 16.2264 18.8333 15.917 18.8333H10.0837C9.77424 18.8333 9.47749 18.7104 9.2587 18.4916C9.03991 18.2728 8.91699 17.976 8.91699 17.6666V9.49996M10.667 9.49996V8.33329C10.667 8.02387 10.7899 7.72713 11.0087 7.50833C11.2275 7.28954 11.5242 7.16663 11.8337 7.16663H14.167C14.4764 7.16663 14.7732 7.28954 14.9919 7.50833C15.2107 7.72713 15.3337 8.02387 15.3337 8.33329V9.49996" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M11.833 12.4166V15.9166" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M14.167 12.4166V15.9166" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
                                                 </svg>
                                             </span>
                                            </button>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 w-50" controlId="formDepartment">
                                    <Form.Label className="input-label">დეპარტამენტი<span className="label-required">*</span></Form.Label>
                                    <Form.Select as="select" name="department_id">
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-end pt-4">
                            <Col className="col-2">
                                <Button className="btn-transparent" onClick={handleClose}>
                                    გაუქმება
                                </Button>
                            </Col>
                            <Col className="col-4">
                                <Button className="btn-violent" type="submit">
                                    დაამატე თანამშრომელი
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEmployeeModal;
