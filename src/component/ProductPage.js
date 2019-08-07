import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { actions } from '../redux'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import Cart from './Cart'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
const { addedCart, removeCart } = actions

class ProductPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			wishListOpen: false,
			wishList: []
		}
	}
	componentWillMount(){
		this.setState({wishList: JSON.parse(localStorage.getItem("wishList")) || []})
	}
	
	handleAddClick = (product, objId) => {
		this.props.addedCart(product, objId)
	}

	handleSubClick = (index) => {
		this.props.removeCart(index)
	}

	handleWishList = () => {
		this.setState({wishListOpen: !this.state.wishListOpen})
	}

	addToWishList = (name) => {
		const wished = this.state.wishList
		wished.push(name)
		localStorage.setItem('wishList',JSON.stringify(wished))
		this.setState({wishList : wished})
	}

	removeToWishList = (name) => {
		const wished = this.state.wishList
		wished.splice(wished.indexOf(name) , 1)
		localStorage.setItem('wishList',JSON.stringify(wished))
		this.setState({wishList : wished})
	}

	render() {
		const { productData, cartData, cartTotal } = this.props;
		const {wishList} = this.state;
	  	return(
	  		<div>
	  		<Cart cartData={cartData} cartTotal={cartTotal} handleAddCart={this.handleAddClick} handleSubCart={this.handleSubClick} />
			<Button variant="contained" onClick={this.handleWishList} color="secondary">WishList</Button>
			
			<Dialog onClose={this.handleWishList} open={this.state.wishListOpen} aria-labelledby="simple-dialog-title">
				<DialogTitle id="simple-dialog-title">Your WishList</DialogTitle>
					{wishList.map((val,index) => (
					<List key={index}>
					<ListItem>
						<ListItemText>{index+1} Your wishes: {val}</ListItemText>
					</ListItem>
					<Divider />
					</List>
					))}
				<Button variant="contained" onClick={this.handleWishList} color="secondary">CLOSE</Button>
			</Dialog>
	  		<Grid container spacing={2}>
		  		{productData &&
		  			productData.map((val, index) => (
		  				<Grid xs={4}>
			  				<div key={index}>
			  				<h4>ITEM : {val.name}</h4>
			  				<h4>PRICE : {val.price}</h4>
			  				<h4>QUANTITY : {val.total_qnt}</h4>
							  {wishList.indexOf(val.name) > -1 ?
							  	<Button variant="contained" onClick={()=>this.removeToWishList(val.name)} color="secondary">REMOVE WISH</Button>:
								<Button variant="contained" onClick={()=>this.addToWishList(val.name)} color="secondary">ADD TO WISHLIST</Button>
							  }
					  		<Button disabled={val.total_qnt<1} variant="contained" color="secondary" onClick={()=>this.handleAddClick(val, index)}>
						    	{val.total_qnt > 0 ? 'ADD TO CART' : 'SOLD'}
						    </Button>
						    </div>
						</Grid>
		  			))
				}
		    	<Grid spacing={2} >
					<Button variant="contained" color="secondary">
			    		<Link to="/checkout">
							PROCEED TO PAYMENT
			    		</Link>
					</Button>
				</Grid>
			</Grid>
	  		</div>
	  	)
	}
}

const mapStateToProps = state => {
  return {
    productData: state.productReducer.productData,
	cartData: state.productReducer.cartData,
	cartTotal: state.productReducer.cartTotal
  };
};

export default connect(mapStateToProps, {addedCart, removeCart})(ProductPage);
