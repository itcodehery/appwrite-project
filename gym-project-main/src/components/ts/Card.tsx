import React from "react";
import "../css/Cardstyle.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from "../../assets/images/white-logo.png"; // Ensure this path is correct

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

const Card: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // `once` ensures animation happens only once

  return (
    <motion.div
      className="membership-section"
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Triggers animation only when in view
    >
      <h1 className="membership-heading">Choose Your Membership Plan</h1>

      <div className="card-wrapper">
        {/* 1 Month Membership */}
        <motion.div className="card-container" variants={cardVariants}>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="card"
          >
            <div className="diagonal-background"></div>
            <div className="static-content">
              <h3>1 Month Membership</h3>
              <img
                src={logo}
                alt="Membership Logo"
                className="membership-logo"
              />
              <p className="replacement-text">Exclusive Offer!</p>
            </div>
            <div className="dynamic-content">
              <p className="price">Price: ₹700</p>
              <p>
                Enjoy a 1-month subscription with access to all premium features
                including:
                <ul>
                  <li>Unlimited access to exclusive content</li>
                  <li>Priority customer support</li>
                  <li>Discounts on future purchases</li>
                </ul>
              </p>
              <button className="buy-button">Buy Now</button>
            </div>
          </motion.div>
        </motion.div>

        {/* 2 Month Membership */}
        <motion.div className="card-container" variants={cardVariants}>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="card"
          >
            <div className="diagonal-background"></div>
            <div className="static-content">
              <h3>2 Month Membership</h3>
              <img
                src={logo}
                alt="Membership Logo"
                className="membership-logo"
              />
              <p className="replacement-text">Best Value!</p>
            </div>
            <div className="dynamic-content">
              <p className="price">Price: ₹1200</p>
              <p>
                Get a 2-month subscription with additional perks:
                <ul>
                  <li>All benefits from the 1-month plan</li>
                  <li>Exclusive members-only events</li>
                  <li>10% off on all purchases during membership</li>
                </ul>
              </p>
              <button className="buy-button">Buy Now</button>
            </div>
          </motion.div>
        </motion.div>

        {/* 1 Year Membership */}
        <motion.div className="card-container" variants={cardVariants}>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="card"
          >
            <div className="diagonal-background"></div>
            <div className="static-content">
              <h3>1 Year Membership</h3>
              <img
                src={logo}
                alt="Membership Logo"
                className="membership-logo"
              />
              <p className="replacement-text">Ultimate Plan!</p>
            </div>
            <div className="dynamic-content">
              <p className="price">Price: ₹5000</p>
              <p>
                Enjoy our premium yearly plan with full benefits:
                <ul>
                  <li>All benefits from the 1- and 2-month plans</li>
                  <li>Exclusive one-on-one sessions with experts</li>
                </ul>
              </p>
              <button className="buy-button">Buy Now</button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
