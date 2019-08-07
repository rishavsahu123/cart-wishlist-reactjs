var productList = require('../mockdata/product').productList;

/*constant*/
const FETCHING_PRODUCT = "FETCHING_PRODUCT"
const RECEIVING_CART = "RECEIVING_CART"

const receivedProducts = data => ({
  type: FETCHING_PRODUCT,
  data
});

const receivedCart = (data, total) => ({
  type: RECEIVING_CART,
  data,
  total
});


export const getAllProducts = () => dispatch => {
		var cartData = JSON.parse(localStorage.getItem("productList")) || []
		var prodList = JSON.parse(JSON.stringify(productList))
		for(var i=0; i<cartData.length; i++){
			for(var j=0; j<prodList.length; j++){
				if(cartData[i].id === prodList[j].id){
					prodList[j].total_qnt = prodList[j].total_qnt-cartData[i].total_qnt
				}
			}
		}
		dispatch(receivedCart(cartData, setCartTotal(cartData)))
	    dispatch(receivedProducts(prodList));
};

export const addedCart = (product, objId) => (dispatch, getState) => {
	var dataList = JSON.parse(JSON.stringify(getState().productReducer.productData))
	var cartData = JSON.parse(JSON.stringify(getState().productReducer.cartData))
	var prodObj = { "id": product.id, "name": product.name, "price": product.price, "total_qnt": 1, "objId":objId }
	var flag = true
	if(dataList[objId].total_qnt > 0){
		dataList[objId].total_qnt -= 1;
		for(var i=0; i<cartData.length; i++){
			if(cartData[i].id === product.id){
				flag = false
				prodObj.total_qnt = cartData[i].total_qnt+1
				cartData[i] = prodObj
				break;
			}
		}
		if(flag){
			cartData.push(prodObj)
		}
		localStorage.setItem("productList",JSON.stringify(cartData))
		dispatch(receivedCart(cartData, setCartTotal(cartData)))
    	dispatch(receivedProducts(dataList));
	}
}

export const removeCart = (index) => (dispatch, getState) => {
	var cartData = JSON.parse(JSON.stringify(getState().productReducer.cartData))
	cartData[index].total_qnt -= 1
	if (cartData[index].total_qnt === 0){
		cartData.splice(index, 1)
	}
	localStorage.setItem("productList",JSON.stringify(cartData))
	dispatch(getAllProducts())
}

const setCartTotal = (cartData) => {
	var total = 0;
	cartData.map(val => (
		total += (val.total_qnt*val.price)
	))
	return total;
}

export const actions = {
	getAllProducts,
	addedCart,
	removeCart
};
