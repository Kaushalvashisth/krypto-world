import React from 'react'

const Learn = () => {
  
  const vid=["dv6R2UY2mpc",
  "tvz0R2PTPBQ","mQvw5JXXnrQ",
  "n_5oeZWbseY","ipwxYa-F1uY","coQ5dg8wM2o","axGzh4iVoZU"];
  const title=["Ethereum Price Prediction 2022",
  "Bitcoin Price Prediction 2022","The Ultimate Cryptocurrency Trading Course for Beginners",
  "Blockchain development roadmap 🙂","Learn Solidity 🙂","Build Your first DApp",
  "How to Read Cryptocurrency Charts (Crypto Charts for Beginners)"];
  return (
      vid.map((id,index)=>{
        return( 
            <div>
            <h1>{index+1}. {title[index]}  </h1>
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
                width="80%"
                height="400px"
            />{" "}
            </div> 
        );
      })
    
  )
}

export default Learn