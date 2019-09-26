import couch from '../images/Couch.jpg';
import table from '../images/Table.jpg';
import queenPanelBed from '../images/Queen-Panel-Bed.jpeg';
import blackCouch from '../images/Black-Couch.jpg';
import singlePanelBed from '../images/Single-Panel-Bed.jpg';
import twinPanelBed from '../images/Twin-Panel-Bed.jpg';
import Dresser from '../images/Dresser.jpeg';
import kingPanelBed from '../images/King-Panel-Bed.jpg';

const database = {
  products: [
    {
      name: 'Couch',
      price: 120,
      image: couch
    },
    {
      name: 'Table',
      price: 50,
      image: table
    },
    {
      name: 'Queen Panel Bed',
      price: 210,
      image: queenPanelBed
    },
    {
      name: 'Black Couch',
      price: 125,
      image: blackCouch
    },
    {
      name: 'Single Panel Bed',
      price: 90,
      image: singlePanelBed
    },
    {
      name: 'Twin Panel Bed',
      price: 145,
      image: twinPanelBed
    },
    {
      name: 'Dresser',
      price: 60,
      image: Dresser
    },
    {
      name: 'King Panel Bed',
      price: 100,
      image: kingPanelBed
    }
  ]
};

export default database;
