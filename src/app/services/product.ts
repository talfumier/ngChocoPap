export interface Product {  
  id: string ,
  title: string,
  price: number,
  note : number,
  image: string,
  category: {
    blanc: boolean,
    lait: boolean,
    noir: boolean,
    caramel: boolean,
    noix: boolean,
    fruit: boolean,
    liqueur: boolean
  },
  description: string,
  ingredients: string
}