// client/src/features/dashboard/FarmList.js
import React, { useState } from 'react';
import Slider from "react-slick";
import FarmCard from './FarmCard';
import FarmModal from './FarmModal';
import { farmAPI } from '../../utils/api';
import './FarmList.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FarmList = ({ farms, setFarms, userId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);

  const handleEdit = (farm) => {
    setSelectedFarm(farm);
    setModalOpen(true);
  };

  const handleDeleteFarm = async (farmId) => {
    try {
      await farmAPI.delete(farmId);
      setFarms(farms.filter(farm => farm._id !== farmId));
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: farms.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "0"
  };

  return (
    <div className="farm-list card">
      <h2>Your Farms</h2>
      {farms.length > 0 ? (
        <Slider {...settings}>
          {farms.map(farm => (
            <div key={farm._id} className="farm-slider-item">
              <FarmCard
                farmData={farm}
                onUpdate={(data) => {
                  const updatedFarms = farms.map(f => 
                    f._id === data._id ? data : f
                  );
                  setFarms(updatedFarms);
                }}
                onDelete={handleDeleteFarm}
                onEdit={handleEdit}  // Pass the edit callback
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>You haven't added any farms yet.</p>
      )}

      <button 
        className="btn btn-primary add-farm-button"
        onClick={() => {
          setSelectedFarm(null);
          setModalOpen(true);
        }}
      >
        Add New Farm
      </button>

      <FarmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        farmData={selectedFarm}
        onSubmit={(newFarm) => {
          if (selectedFarm) {
            setFarms(farms.map(f => f._id === newFarm._id ? newFarm : f));
          } else {
            setFarms([...farms, newFarm]);
          }
        }}
        userId={userId}
      />
    </div>
  );
};

export default FarmList;