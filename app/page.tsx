'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search, ShoppingBag, Plus, Minus, X, Menu as MenuIcon, Instagram, MapPin, Clock, Sparkles, Flame, Leaf, Utensils } from 'lucide-react';

type Dish = { id:number; name:string; desc:string; price:number; category:string; tag?:string; image:string; veg:boolean };
const dishes: Dish[] = [
 {id:1,name:'BB Signature Smash Burger',desc:'Juicy double patty, melted cheese, house sauce and toasted brioche.',price:289,category:'Burgers',tag:'Bestseller',image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900',veg:false},
 {id:2,name:'Loaded Peri Peri Fries',desc:'Crispy fries tossed in peri peri seasoning with creamy dip.',price:169,category:'Sides',tag:'Crowd favourite',image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900',veg:true},
 {id:3,name:'Crispy Chicken Stack',desc:'Golden crunchy chicken, fresh lettuce and a punchy house dressing.',price:259,category:'Burgers',image:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900',veg:false},
 {id:4,name:'Paneer Tikka Wrap',desc:'Smoky paneer, crunchy onions and mint mayo wrapped to go.',price:219,category:'Wraps',tag:'Vegetarian',image:'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=900',veg:true},
 {id:5,name:'Cheesy Nachos',desc:'Corn chips, cheese sauce, jalapeños and a little bit of heat.',price:199,category:'Sides',image:'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=900',veg:true},
 {id:6,name:'Chocolate Overload Shake',desc:'Thick chocolate shake finished with a decadent drizzle.',price:149,category:'Drinks',image:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900',veg:true},
];
const categories = ['All','Burgers','Wraps','Sides','Drinks'];
const money = (n:number) => `₹${n}`;

export default function Home() {
 const [category,setCategory] = useState('All');
 const [query,setQuery] = useState('');
 const [cart,setCart] = useState<Record<number,number>>({});
 const [cartOpen,setCartOpen] = useState(false);
 const [mobileOpen,setMobileOpen] = useState(false);
 const [notice,setNotice] = useState('');
 const [assistantOpen,setAssistantOpen] = useState(false);
 const filtered = useMemo(()=>dishes.filter(d=>(category==='All'||d.category===category) && (d.name.toLowerCase().includes(query.toLowerCase())||d.desc.toLowerCase().includes(query.toLowerCase()))),[category,query]);
 const count = Object.values(cart).reduce((a,b)=>a+b,0);
 const total = dishes.reduce((sum,d)=>sum+d.price*(cart[d.id]||0),0);
 const add = (id:number) => setCart(c=>({...c,[id]:(c[id]||0)+1}));
 const change = (id:number,delta:number) => setCart(c=>{const n=(c[id]||0)+delta; const next={...c}; if(n<=0) delete next[id]; else next[id]=n; return next;});
 const scrollMenu = () => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'});
 const orderLink = '#'; // Replace with your real Zomato/Swiggy restaurant URLs before publishing.
 return <main>
  <div className="topline">GOOD FOOD. GREAT MOOD. <span>FRESHLY MADE, ALWAYS.</span></div>
  <header className="nav">
   <a className="brand" href="#"><span className="brandmark">BB</span><span>BIER BELLY <b>BITES</b><small>BIG FLAVOURS. HAPPY BELLIES.</small></span></a>
   <nav className={mobileOpen?'navlinks open':'navlinks'}>
    <a href="#menu" onClick={()=>setMobileOpen(false)}>Menu</a><a href="#story" onClick={()=>setMobileOpen(false)}>Our story</a><a href="#contact" onClick={()=>setMobileOpen(false)}>Contact</a>
   </nav>
   <div className="navactions"><button className="cartbtn" onClick={()=>setCartOpen(true)}><ShoppingBag size={17}/> <span>Bag</span><b>{count}</b></button><button className="mobiletoggle" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><MenuIcon/></button></div>
  </header>

  <section className="hero">
   <div className="heroimage"></div><div className="herooverlay"></div>
   <div className="hero-content">
    <div className="eyebrow"><span></span> MADE FOR BIG APPETITES</div>
    <h1>Come hungry.<br/><em>Leave happy.</em></h1>
    <p>Bold flavours, feel-good food and bites worth talking about. Your next favourite meal starts right here.</p>
    <div className="hero-buttons"><button className="primary" onClick={scrollMenu}>Explore the menu <ArrowRight size={18}/></button><a className="secondary" href="#story">Get to know us</a></div>
    <div className="hero-note"><span><Flame size={15}/> BIG ON FLAVOUR</span><span><Leaf size={15}/> FRESHLY PREPARED</span></div>
   </div>
   <div className="hero-stamp"><span>GOOD<br/>FOOD</span><b>✳</b><span>GOOD<br/>MOOD</span></div>
  </section>

  <section className="ticker"><div>BURGERS <b>✳</b> WRAPS <b>✳</b> LOADED SIDES <b>✳</b> FEEL-GOOD BITES <b>✳</b> BIG FLAVOURS <b>✳</b> BURGERS <b>✳</b> WRAPS <b>✳</b> LOADED SIDES <b>✳</b></div></section>

  <section className="section menu-section" id="menu">
   <div className="section-head"><div><div className="eyebrow dark">THE GOOD STUFF</div><h2>Find your <em>craving.</em></h2><p>Made fresh. Packed with flavour. Ready for your table.</p></div><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the menu"/></div></div>
   <div className="filters">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c}</button>)}</div>
   <div className="dishgrid">{filtered.map(d=><article className="dish" key={d.id}><div className="dishphoto"><img src={d.image} alt={d.name}/>{d.tag&&<span className="tag">{d.tag}</span>}<span className={d.veg?'veg vegmark':'nonveg vegmark'}></span></div><div className="dishbody"><div className="dishline"><h3>{d.name}</h3><b>{money(d.price)}</b></div><p>{d.desc}</p><div className="dishfoot"><span>{d.category}</span><button className="addbtn" onClick={()=>add(d.id)}>{cart[d.id]?<><span>{cart[d.id]} added</span><Plus size={15}/></>:<>Add <Plus size={15}/></>}</button></div></div></article>)}</div>
   {filtered.length===0&&<div className="empty">No dishes found. Try another search.</div>}
  </section>

  <section className="feature">
   <div className="feature-photo"><img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200" alt="Freshly made burger"/></div>
   <div className="feature-copy"><div className="eyebrow">A LITTLE EXTRA JOY</div><h2>Not just food.<br/><em>A whole mood.</em></h2><p>We believe good food should bring people together. That's why every bite is made to be generous, flavourful and unapologetically satisfying.</p><button className="lightbtn" onClick={scrollMenu}>Find your favourite <ArrowRight size={17}/></button></div>
  </section>

  <section className="section story" id="story"><div className="story-left"><div className="eyebrow dark">THE BIER BELLY WAY</div><h2>Made with heart.<br/><em>Served with attitude.</em></h2></div><div className="story-right"><p>Bier Belly Bites is all about bringing big, comforting flavours to your everyday cravings. From the first bite to the last, we want every meal to feel like a little celebration.</p><div className="values"><div><b>01</b><span>Freshly prepared</span></div><div><b>02</b><span>Flavour first</span></div><div><b>03</b><span>Always satisfying</span></div></div></div></section>

  <section className="orderband"><div><div className="eyebrow">YOUR NEXT BITE IS CALLING</div><h2>Ready to dig in?</h2><p>Order your favourites the way you like.</p></div><div className="orderbuttons"><a href={orderLink} target="_blank" rel="noreferrer" className="zomato">Order on Zomato <ArrowRight size={17}/></a><a href={orderLink} target="_blank" rel="noreferrer" className="swiggy">Order on Swiggy <ArrowRight size={17}/></a></div></section>

  <section className="contact section" id="contact"><div><div className="eyebrow dark">SAY HELLO</div><h2>Let's make<br/><em>something happen.</em></h2></div><div className="contactdetails"><p>For orders, collaborations and business enquiries, we'd love to hear from you.</p><a href="mailto:hello@bierbellybites.com">hello@bierbellybites.com <ArrowRight size={16}/></a><span><MapPin size={16}/> Add your city / service area</span><span><Clock size={16}/> Add your operating hours</span></div></section>

  <footer><a className="brand footbrand" href="#"><span className="brandmark">BB</span><span>BIER BELLY <b>BITES</b><small>BIG FLAVOURS. HAPPY BELLIES.</small></span></a><span>© {new Date().getFullYear()} Bier Belly Bites. Made for good times.</span><a href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>Back to top ↑</a></footer>

  <button className="assistant-fab" onClick={()=>setAssistantOpen(!assistantOpen)}><Sparkles size={17}/> Ask BB</button>
  {assistantOpen&&<div className="assistant"><button className="close" onClick={()=>setAssistantOpen(false)}><X size={16}/></button><Sparkles/><b>Hey, hungry human!</b><p>Our AI food assistant is coming soon. For now, explore the menu and find your next favourite bite.</p><button onClick={()=>{setAssistantOpen(false);scrollMenu()}}>Explore menu</button></div>}

  {cartOpen&&<div className="drawerback" onClick={()=>setCartOpen(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawertop"><div><small>YOUR ORDER</small><h2>Your bag <span>({count})</span></h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>{count===0?<div className="emptycart"><ShoppingBag size={34}/><b>Your bag is taking a breather.</b><p>Add something delicious from the menu.</p><button onClick={()=>{setCartOpen(false);scrollMenu()}}>Explore menu</button></div>:<><div className="cartitems">{dishes.filter(d=>cart[d.id]).map(d=><div className="cartitem" key={d.id}><img src={d.image} alt=""/><div><b>{d.name}</b><span>{money(d.price)}</span><div className="qty"><button onClick={()=>change(d.id,-1)}><Minus size={13}/></button>{cart[d.id]}<button onClick={()=>change(d.id,1)}><Plus size={13}/></button></div></div></div>)}</div><div className="carttotal"><div><span>Subtotal</span><b>{money(total)}</b></div><small>Delivery fee and taxes, if applicable, are not included.</small><button onClick={()=>setNotice('Prototype only: checkout and online payments will be enabled in a future release.')}>Continue to checkout <ArrowRight size={17}/></button>{notice&&<p>{notice}</p>}</div></>}</aside></div>}
 </main>;
}
