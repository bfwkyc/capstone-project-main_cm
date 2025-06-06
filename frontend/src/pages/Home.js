import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/MainSlider.css';
import '../styles/AnimalGrid.css';
import '../styles/wrap.css';
import axios from 'axios';

function Home() {
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    const fetchAnimals = async (upkind) => {
      try {
        const res = await axios.get('/api/animals/home', {
          params: {
            upkind,
            bgnde: '20250501',
            endde: today,
            numOfRows: 10,
          },
        });
        const items = res.data?.response?.body?.items?.item || [];
        const list = Array.isArray(items) ? items : [items];
        const sorted = list.sort((a, b) => b.happenDt.localeCompare(a.happenDt));
        const formatted = sorted.map(animal => ({
          id: animal.desertionNo,
          img: animal.popfile1,
          link: `/animal/${animal.desertionNo}`,
          upkind: animal.upKindCd,
        }));
        return formatted;
      } catch (err) {
        console.error('fetch error:', err);
        return [];
      }
    };

    const loadAnimals = async () => {
      const dogList = await fetchAnimals('417000');
      const catList = await fetchAnimals('422400');
      const filteredDogs = dogList.filter(animal => animal.upkind === '417000');
      const filteredCats = catList.filter(animal => animal.upkind === '422400');
      setDogs(filteredDogs.slice(0, 5));
      setCats(filteredCats.slice(0, 5));
    };

    loadAnimals();
  }, []);

  const sliderImages = [
    '/images/slider1.png',
    '/images/slider2.png',
    '/images/slider3.png',
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="home-container">
      <Header />
      <MenuBar />

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {sliderImages.map((img, idx) => (
            <div key={idx} className="slide">
              <img src={img} alt={`slide-${idx}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="wrap">
        <div className="animal-grid">
          <h2 className="section-title">최근 등록된 보호견 {'>'}</h2>
          <div className="grid-container">
            {dogs.map((animal) => (
              <div className="animal-cards" key={animal.id}>
                <a href={animal.link}>
                  <img src={animal.img} alt="Dog" className="animal-img" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="animal-grid">
          <h2 className="section-title">최근 등록된 보호묘 {'>'}</h2>
          <div className="grid-container">
            {cats.map((animal) => (
              <div className="animal-cards" key={animal.id}>
                <a href={animal.link}>
                  <img src={animal.img} alt="Cat" className="animal-img" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
