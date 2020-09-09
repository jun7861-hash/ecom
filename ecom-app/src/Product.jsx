import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const Product = ({id, name, image, description, price, size, addFunc}) => {

	const initialValues = {
		size: ""
	  };
	  const validationSchema = Yup.object().shape({
		size: Yup
			.string()
			.required("*")
	  });
	  
	  
	  const onSubmit = () => {
		addFunc({id, name, image, price, description, size, units: 1})
	  }

	return (
		<>
			<div className="col-pc-6">
                <div className="item-image">
                    <img src={image} alt="classic-tee" />
                </div>
            </div>
            <div className="col-pc-6">
                <div className="item-info">
                    <div className="item-title">
                        <p>{name}</p>
                    </div>
                    <div className="item-price">
                        <p>$ {price}.00</p>
                    </div>
                    <div className="item-description">
                        <p>{description}</p>
                    </div>
                    <div className="item-sizes">
						<Formik
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              onSubmit={onSubmit}
						>
							{({ values }) => (
                                <Form>
                                  <div className="size-container">
                                    <p className="size-title">
                                      SIZE
                                      <span className="error-message"><ErrorMessage name="selected"/></span> {" "}
                                      <span className="selected-size">{values.size}</span>
                                    </p>
                                  </div>
                                  <label className="radio-label">
                                    <Field type="radio" name="selected" value="S" />
                                    <span className="radio-text">S</span>
                                  </label>
                                  <label>
                                    <Field type="radio" name="selected" value="M" />
                                    <span className="radio-text">M</span>
                                  </label>
                                  <label>
                                    <Field type="radio" name="selected" value="L" />
                                    <span className="radio-text">L</span>
                                  </label>
								  <button 
									  className="add-button" 
									  type="submit"
								  >
									ADD TO CART
								  </button>
                                </Form>
                              )}

						</Formik>
                    </div>
                </div>
            </div>


			
		</>
	)
}

export default Product