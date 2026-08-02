/* ==========================
   التواصل
========================== */

#contact{
    max-width:1000px;
    margin:auto;
    padding:100px 20px;
    text-align:center;
}

#contact h2{
    color:var(--main);
    font-size:38px;
    margin-bottom:30px;
}

#contact p{
    font-size:20px;
    margin:15px 0;
    color:var(--gray);
}

#contact i{
    color:var(--main);
    margin-left:10px;
    font-size:22px;
}

/* ==========================
   الفوتر
========================== */

footer{
    background:#090d12;
    padding:25px;
    text-align:center;
    color:var(--gray);
    margin-top:50px;
}

/* ==========================
   الخلفية المتحركة
========================== */

body::before{
    content:"";
    position:fixed;
    width:500px;
    height:500px;
    background:rgba(0,119,255,.15);
    border-radius:50%;
    top:-150px;
    right:-150px;
    filter:blur(120px);
    animation:move1
