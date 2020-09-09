import React from 'react'

const Cart = ({id, name, description, image, price, size, units, removeFunc, unitsIncrement, unitsDecrement}) => {
    const subTotal = [units * price];
    
    return (
        <>
            <div className='card mb-3'>
                <div className='row no-gutters'>
                    <div className='col-md-3'>
                        <img src={image} alt={name} className='card-img' />
                    </div>
                    <div className='col-md-9'>
                        <div className='card-body'>
                            <h5 className='card-title'>{name}</h5>
                            <p className='card-text mb-2'>$ {price}.00</p>
                            <p className='card-text mb-2'>{description}</p>
                            <div className='card-text text-right'>
                                <label className='mr-2'>Quantity: </label>
                                <div className='btn-group mr-2 w-50'>
                                    <button type='button' className='btn btn-secondary' onClick={() => unitsDecrement({id, name, image, description, price, size, units})}>-</button>
                                    <input type='text' className="form-control p-2" value={units} readOnly />
                                    <button type='button' className='btn btn-secondary' onClick={() => unitsIncrement({id, name, image, description, price, size, units})}>+</button>
                                </div>
                                <button className='btn btn-dark' onClick={() => removeFunc({id, name, description, image, price, size, units})}>X</button>

                                <p className='mt-2 text-right'>Subtotal: $ {subTotal}.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart