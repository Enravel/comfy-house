import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import Shop from '../Components/Shop/Shop';
import Cart from '../Components/Cart/Cart';

// importing css
import './App.css';

// importing database
import database from './database';

class App extends React.Component {
  // onaj lik (kurs) je reko da constructor(props) i super(props) se pise ako koristis props u konstruktor a ti si mi reko da uvek pisem, nzm ovako mi izgleda bolje xd
  constructor() {
    super();
    this.state = {
      // vuce podatke iz database
      products: database.products,

      cartVisibility: false,

      // to je ustvari cartState, prikazuje se u cart
      shopState: [],

      cartTotal: 0,

      // u navbar ikonica za cart na koju se dodaje broj itema u cartu
      itemsInCart: 0
    };

    this.handleClickCart = this.handleClickCart.bind(this);
    this.handleClickShop = this.handleClickShop.bind(this);
    this.handleClickRemoveCartItem = this.handleClickRemoveCartItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  calculateTotal() {
    let newTotal = 0;
    this.state.shopState.map(item => {
      // msm da ne treba komentar, btw kazi mi ako previse komentarisem ocigledne stvari, zato sto ja razumem ovo odma zato sto sam ga ja pravio nzm kako ce tebi da bude
      return (newTotal += item.price * item.quantity);
    });

    this.setState({ cartTotal: newTotal });
  }

  // ovo sam promenio i meni se vise svidja ovako da radim - samo toggluje true/false na klik
  handleClickCart() {
    if (this.state.cartVisibility === false) {
      this.setState({
        cartVisibility: true
      });
    } else {
      this.setState({
        cartVisibility: false
      });
    }
  }

  alreadyExists(object) {
    if (this.state.shopState.some(item => item.name === object.name)) {
      return true;
    } else {
      return false;
    }
  }

  // dodavanje itema iz shopa u cart
  handleClickShop(shopObject) {
    // ova gore funkcija proveri dal postoji vec taj item ako da onda ga ne dodaje nego samo doda 1 u quantity
    if (this.alreadyExists(shopObject)) {
      let newState = this.state.shopState;
      newState[newState.indexOf(shopObject)].quantity += 1;

      this.setState(
        {
          shopState: newState
        },
        this.calculateTotal // update total
      );
      this.calculateItemsInCart(); // svugde sam morao da dodajem ovo u callback kao sto vidis dole, ali zbog nekog razliga ako item vec postoji onda radi i ovako ne znam sto
    } else {
      //ako ne postoji onda ga normalno doda
      this.setState(
        { shopState: [...this.state.shopState, shopObject] },
        () => {
          (() => {
            this.calculateTotal(); // update total
          })();
          (() => {
            this.calculateItemsInCart(); // update itemsInCart
          })();
        }
      );
    }
  }

  // brisanje cart item-a
  handleClickRemoveCartItem(shopObject) {
    // bio je bug kad naprimer imam 20 quantity i izbrisem ceo item, ako ga dodam opet on odma ima 20 quantity
    shopObject.quantity = 1;

    this.setState(
      {
        shopState: this.state.shopState.filter(index => index !== shopObject) // brise iz shopState-a
      },
      () => {
        (() => {
          this.calculateTotal(); // kapiras vec xd
        })();
        (() => {
          this.calculateItemsInCart(); // -||-
        })();
      }
    );
  }

  // to se displajuje na onu cart ikonicu
  calculateItemsInCart() {
    let itemsInCart = 0;
    this.state.shopState.map(item => {
      return (itemsInCart += item.quantity);
    });

    this.setState({ itemsInCart: itemsInCart });
  }

  clearCart() {
    // ovde sam malo cheatovo, nzm sto mi vraca quantity na onaj koj je pre bio ako ja u shop renderujem iz database gde je uvek 1 po dafaultu valjda
    // ima tu nesto ali to je fora kad radim dugo projekat, bukvalno zaboravim kako sve radi i onda me mrzi da opet gledam

    // resetujem state da quantity bude opet 1
    const newState = this.state.shopState;
    newState.map(item => {
      return (item.quantity = 1);
    });
    this.setState({ shopState: newState });
    // brisem state
    this.setState({ shopState: [] }, () => {
      (() => {
        this.calculateTotal();
      })();
      (() => {
        this.calculateItemsInCart();
      })();
    });
    // 2 set state , rip - pokusavao sam sa neke sintakse da pozovem samo jedan state koj radi ovo sto rade ova 2 ali nece
  }

  // razmisljao sam da ovu funkciju koristim u handleClickShop ali onda ce handleClickShop 2 puta da menja state sto ce da 'povredi' performance ali ispade da je komplikovanije nego sto sam mislio
  incrementQuantity(itemInfo) {
    // samo dodaje quantity i updatuje sranja
    const newState = this.state.shopState;
    newState[newState.indexOf(itemInfo)].quantity += 1; // ovde moze da ide u vise od 99 sto sjebe dizajn cart ikonice ali napinjanje brt, zato sto ako ima 2 itema koja su 51 idalje ce da sjebe dizajn ali to je vec previse, da je jedan if statement uradio bi ga
    this.setState(
      {
        shopState: newState
      },
      () => {
        (() => {
          this.calculateTotal();
        })();
        (() => {
          this.calculateItemsInCart();
        })();
      }
    );
  }

  // i ovo bi vrv moglo da se napravi u 1 funkciju, tipa changeQuantity koja ima itemInfo i true ili false kao argumenti ako je true incrementuje ako je false decrementuje
  decrementQuantity(itemInfo) {
    const newState = this.state.shopState;
    if (newState[newState.indexOf(itemInfo)].quantity !== 1) {
      // da nebi mogo da ide na 0 i u minus
      newState[newState.indexOf(itemInfo)].quantity -= 1;
      this.setState(
        {
          shopState: newState
        },
        () => {
          (() => {
            this.calculateTotal();
          })();
          (() => {
            this.calculateItemsInCart();
          })();
        }
      );
    }
  }

  render() {
    const {
      cartVisibility,
      shopState,
      cartTotal,
      products,
      itemsInCart
    } = this.state;
    return (
      <div className="App">
        <Navbar handleClick={this.handleClickCart} itemsInCart={itemsInCart} />
        <Cart
          // naming moze da bude zbunjujuc ja se izvinjavam ali keve mi lakse ceo projekat da izkomentarisem nego da menjam imena sad kad je sve gotovo xd
          cartVisibility={cartVisibility}
          handleClick={this.handleClickCart}
          shopState={shopState}
          removeItem={this.handleClickRemoveCartItem}
          cartTotal={cartTotal}
          clearCart={this.clearCart}
          incrementQuantity={this.incrementQuantity}
          decrementQuantity={this.decrementQuantity}
        />
        <Home />
        <Shop
          products={products}
          handleClick={this.handleClickShop}
          openCartOnClick={this.handleClickCart}
        />
      </div>
    );
  }
}

export default App;
