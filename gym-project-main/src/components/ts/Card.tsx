import React, { useEffect, useState } from "react";
import "../css/Cardstyle.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from "../../assets/images/white-logo.png";
import {databases} from "../../helpers/appwrite"; // Import account from Appwrite



const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, type: "spring", stiffness: 100 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

interface CardData {
  title: string;
  price: number;
  duration: string;
  description: string;
  benefits: string[];
}

const Card: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const documentIds = [
          "672142ec003af6875317",
          "67214309001a8490a7af",
          "672142ec003af6875317",
        ];
        const collectionId = "6721402b00046052866b";
        
        const promises = documentIds.map((id) =>
          databases.getDocument("6704c99a003ba58938df", collectionId, id)
        );
        
        const results = await Promise.all(promises);
        const formattedData = results.map((doc) => ({
          title: doc.title,
          price: doc.price,
          duration: doc.duration,
          description: doc.description,
          benefits: doc.benefits,
        }));
        
        setCardData(formattedData);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    };

    fetchCardsData();
  }, []);

  return (
    <motion.div
      className="membership-section"
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <h1 className="membership-heading">Choose Your Membership Plan</h1>

      <div className="card-wrapper">
        {cardData.map((data, index) => (
          <motion.div className="card-container" variants={cardVariants} key={index}>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="card"
            >
              <div className="diagonal-background"></div>
              <div className="static-content">
                <h3>{data.title}</h3>
                <img
                  src={logo}
                  alt="Membership Logo"
                  className="membership-logo"
                />
                <p className="replacement-text">{data.duration}</p>
              </div>
              <div className="dynamic-content">
                <p className="price">Price: ₹{data.price}</p>
                <p>
                  {data.description}
                  <ul>
                    {data.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </p>
                <button className="buy-button">Buy Now</button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Card;
