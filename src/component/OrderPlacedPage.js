import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CartProduct from './CartProduct';
import {connect} from 'react-redux';

class OrderPlacedPage extends React.Component{
  render() {
    const { cartData, cartTotal } = this.props;
  	const address = this.props.location.state
    return (
      <React.Fragment>
      <CartProduct cartData={cartData} cartTotal={cartTotal} />
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {/*products.map(product => (
          <ListItem key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))*/}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1">
            
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.firstName+ ' '+address.lastName}</Typography>
          <Typography gutterBottom>{`${address.address} ${address.city}, ${address.zip}(${address.state}), ${address.pin}, ${address.country}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Delivery Date
          </Typography>
          <Typography gutterBottom>{'01/ aug/ 2019'}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {address.payment}
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
      <Button variant="contained" color="secondary" onClick={window.print}>
      	print this page
      </Button>
      </Grid>
    </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  cartData: state.productReducer.cartData,
  cartTotal: state.productReducer.cartTotal
})
export default connect(mapStateToProps)(OrderPlacedPage);