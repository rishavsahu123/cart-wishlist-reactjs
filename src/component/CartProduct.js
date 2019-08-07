import React from 'react';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'


const CartProduct = ({ cartData, cartTotal }) => (
<div>
      <Typography variant="h5" gutterBottom>
        Product Details
      </Typography>
      {cartData.map((val) => (
        <div>
          Product: {val.name}
          Price: {val.price}
          Quanity: {val.total_qnt}
        <Divider />
        </div>
      ))}
      TOTAL: {cartTotal}
</div>
)

export default CartProduct