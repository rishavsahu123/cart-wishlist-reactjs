import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';

class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      openCart : false
    }
  }

  handleCart = () => {
    this.setState({openCart: !this.state.openCart})
  }

  render(){
    const {cartData, handleSubCart, handleAddCart, cartTotal} = this.props;
    return (
    <div>
      <Button variant="contained" onClick={this.handleCart} color="secondary">CART</Button>
      <Dialog onClose={this.handleCart} open={this.state.openCart} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">Your Cart{cartData.length===0 ? ' is empty!':null}</DialogTitle>
        {cartData.map((val,index) => (
        <List key={index}>
          <ListItem>
            <ListItemText>Product: {val.name}</ListItemText>
            <ListItemText>Price: {val.price}</ListItemText>
            <ListItemText>Quanity: {val.total_qnt}</ListItemText>
            <Button variant="contained" color="primary" onClick={()=>handleAddCart(val, val.objId)} size="small">Add</Button><Button size="small" variant="contained" color="primary" onClick={()=>handleSubCart(index)}>sub</Button>
          </ListItem>
          <Divider />
        </List>
        ))}
        TOTAL: {cartTotal}
      <Button variant="contained" onClick={this.handleCart} color="secondary">CLOSE</Button>
    </Dialog>
    </div>
  );
  }
}

export default Cart;