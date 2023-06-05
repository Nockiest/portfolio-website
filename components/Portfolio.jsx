const Portfolio = () => {
    return (
      <section className="my-work" id="work">
        <h2 className="section__title section__title--work">My work</h2>
        <p className="section__subtitle section__subtitle--work">A selection of my range of work</p>
  
        <div className="portfolio">
          {/* Portfolio item 01 */}
          <a href="https://codepen.io/Nockiest/pen/poOoaod" className="portfolio__item">
            <img src="https://i.postimg.cc/brvKhb0k/Akv-rkosn-mek.png" alt="Akvarium" className="portfolio__img" />
          </a>
  
          {/* Portfolio item 02 */}
          <a href="https://codepen.io/Nockiest/pen/OJwMXeP" className="portfolio__item">
            <img src="https://i.postimg.cc/vZzSvy1D/V-st-i-ek-lov-enezlobse.png" alt="Člověče Nezlob se" className="portfolio__img" />
          </a>
  
          {/* Portfolio item 03 */}
          <a href="https://codepen.io/Nockiest/pen/yLKWWvm" className="portfolio__item">
            <img src="https://i.postimg.cc/DyN9XnXh/klika-kasn-mek.png" alt="ClickerGame" className="portfolio__img" />
          </a>
  
          {/* Portfolio item 04 */}
          <a href="https://codepen.io/Nockiest/pen/ExeVgJX" className="portfolio__item">
            <img src="https://i.postimg.cc/ZK2XGWWv/hodinyv-st-i-ek.png" alt="Mechanical clock" className="portfolio__img" />
          </a>
  
          {/* Portfolio item 05 */}
          <a href="https://codepen.io/Nockiest/pen/zYJaNOb" className="portfolio__item">
            <img src="https://i.postimg.cc/g2h1mGhS/achysn-mek.png" alt="ChessClone" className="portfolio__img" />
          </a>
  
          {/* Portfolio item 06 */}
          <a href="https://codepen.io/Nockiest/pen/XWqKavw" className="portfolio__item">
            <img src="https://i.postimg.cc/gknftV2P/Kalkula-kasn-mek.png" alt="Calculator" className="portfolio__img" />
          </a>
  
          <a href="https://codepen.io/Nockiest/pen/VwBoQXb" className="portfolio__item">
            <img src="https://i.postimg.cc/8PCHVvsk/V-st-i-ekparlax.png" alt="Parlax" className="portfolio__img" />
          </a>
        </div>
      </section>
    );
  };

 export default Portfolio