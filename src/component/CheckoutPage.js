import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import CartProduct from './CartProduct';

const PAYMENT = [
	"debit card",
	"credit card",
	"net banking",
	"COD"
]

class CheckoutPage extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	firstName:'',
	    	lastName:'',
	    	address:'',
	    	city:'',
	    	state:'',
	    	zip:'',
        country: '',
	    	payment:'',
	    	open: false
	    };
  	}

  	postValidation = () => {
  		if(this.state.firstName && this.state.lastName && this.state.address && this.state.city &&
  			this.state.state && this.state.zip && this.state.country && this.state.payment)
  			return false
  		return true
  	}

  	handleOpen = () => {
  		this.setState({open:true})
  	}
  	
  	handleClose = () => {
  		this.setState({open:false})
  	}

  	handleChange = (e) => {
  		this.setState({payment:e.target.value})
  	}

  	handleAddress = (e) => {
  		this.setState({[e.target.name]: e.target.value})
  	}

	render(){
    const {firstName, lastName, address, city, state, zip, country, payment} = this.state
    const { cartData, cartTotal } = this.props;
	return (
    <React.Fragment>
      <CartProduct cartData={cartData} cartTotal={cartTotal} />
      <Divider />
      <Typography variant="h5" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={this.handleAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={this.handleAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address line "
            fullWidth
            autoComplete="billing address-line1"
            onChange={this.handleAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={this.handleAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State" fullWidth onChange={this.handleAddress}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip"
            fullWidth
            autoComplete="billing postal-code"
            onChange={this.handleAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={this.handleAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
	      <FormControl>
	        <Select
	          open={this.state.open}
	          onClose={this.handleClose}
	          onOpen={this.handleOpen}
	          value={this.state.payment}
	          onChange={this.handleChange}
	        >
	          {PAYMENT.map((val)=>(
	          	<MenuItem value={val}>{val}</MenuItem>
	          ))}
	        </Select>
	      </FormControl>
	    </Grid>
		<Button disabled={this.postValidation()} variant="contained" color="secondary">
			<Link to={{pathname:"/order-placed", state:{ firstName:firstName, lastName:lastName, address:address, city:city, state:state, zip:zip, country:country, payment:payment} }}>
				PROCEED TO CHECKOUT
			</Link>
		</Button>
      </Grid>
    </React.Fragment>
  );
}
}
const mapStateToProps = (state) => ({
  cartData: state.productReducer.cartData,
  cartTotal: state.productReducer.cartTotal
})

export default connect(mapStateToProps)(CheckoutPage);