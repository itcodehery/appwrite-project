import React from 'react';
import './Cardstyle.css'
import { motion } from 'framer-motion';

const Card: React.FC = () => {
  return (
    <div className="membership-section">
      {/* Heading for all cards */}
      <h1 className="membership-heading">Choose Your Membership Plan</h1>

      <div className="card-wrapper">
        {/* 1 Month Membership */}
        <div className="card-container">
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Animation
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="card">
              <h3>1 Month Membership</h3>
              <p className='price'>Price: ₹700</p>
              <br />
              <p>
                Enjoy a 1-month subscription with access to all premium features including:
                <ul>
                  <li>Unlimited access to exclusive content</li>
                  <li>Priority customer support</li>
                  <li>Discounts on future purchases</li>
                </ul>
              </p>
              <div className="layers">
                {[...Array(10)].map((_, i) => (
                  <div className="layer" key={i}></div>
                ))}
              </div>
              <button className="buy-button">Buy Now</button>
            </div>
          </motion.div>
        </div>

        {/* 2 Month Membership */}
        <div className="card-container">
          <motion.div
            initial={{ opacity: 0, y: -100 }} // Animation
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="card">
              <h3>2 Month Membership</h3>
              <p className='price'>Price: ₹1200</p>
              <br />
              <p>
                Get a 2-month subscription with additional perks:
                <ul>
                  <li>All benefits from the 1-month plan</li>
                  <li>Exclusive members-only events</li>
                  <li>10% off on all purchases during membership</li>
                </ul>
              </p>
              <div className="layers">
                {[...Array(10)].map((_, i) => (
                  <div className="layer" key={i}></div>
                ))}
              </div>
              <button className="buy-button">Buy Now</button>
            </div>
          </motion.div>
        </div>

        {/* 1 Year Membership */}
        <div className="card-container">
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Animation
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="card">
              <h3>1 Year Membership</h3>
              <p className='price'>Price: ₹5000</p>
              <br />
              <p>
                Enjoy our premium yearly plan with full benefits:
                <ul>
                  <li>All benefits from the 1- and 2-month plans</li>
                  <li>Exclusive one-on-one sessions with experts</li>
                  <li>25% discount on every purchase during the membership</li>
                </ul>
              </p>
              <div className="layers">
                {[...Array(10)].map((_, i) => (
                  <div className="layer" key={i}></div>
                ))}
              </div>
              <button className="buy-button">Buy Now</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Card;
