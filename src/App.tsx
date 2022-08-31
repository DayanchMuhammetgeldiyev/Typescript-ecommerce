import {useState}  from 'react';
import {useQuery} from 'react-query';
import { LinearProgress,Drawer,Grid,Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Wrapper, StyleButton } from './App.styles';
import Item from './Item/Item';
import Cart  from './Cart/Cart';
export type CartItemType= {
  id: number;
  category: string;
  description: string;
  image:string;
  price:number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json()

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);
  console.log(data)

  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((ack: number, items) => ack + items.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

   if(isLoading) return <LinearProgress/>;
   if(error) return <div>Oups...</div>



  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
       <Cart 
       cartItems={cartItems}
       addToCart={handleAddToCart}
       removeFromCart={handleRemoveFromCart}
       />
        </Drawer>
        <StyleButton onClick={() => setCartOpen(true)} >
           <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon/>
           </Badge>
        </StyleButton>
      <Grid container spacing={3}>
        {data?.map(item =>(
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
        ))}
      </Grid>
      </Wrapper>
  );
}

export default App;
