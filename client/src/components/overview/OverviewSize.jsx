import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styleComponents/Overview.module.css';
import OverviewCartModal from './OverviewCartModal';

const OverviewSize = (props) => {
  const { skuOfChoice, styleChoice, name } = props;

  const [currentSize, setCurrentSize] = useState('');
  const [currentQuantityAvailable, setCurrentQuantityAvailable] = useState(null);
  const [singleSkuId, setSingleSkuId] = useState('');
  const [allSizesAndQuantities, setAllSizesAndQuantities] = useState([]);
  const [allSkuIds, setAllSkuIds] = useState([]);
  const [quantityAvailable, setQuantityAvailable] = useState([]);
  const [countChosen, setCountChosen] = useState(1);
  const [sku_id, setSku_id] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cartButtonClicked, setCartButtonClicked] = useState(false);
  const [outOfStockState, setOutOfStockState] = useState(null);

  useEffect(() => {
    const skuWithoutNumber = Object.values(skuOfChoice);

    const skuIdsOfChoice = Object.keys(skuOfChoice);

    const sizesAndQuantities = [];

    const skuIds = [];

    if (skuWithoutNumber.length > 0) {
      for (let i = 0; i < skuWithoutNumber.length; i++) {
        sizesAndQuantities.push(skuWithoutNumber[i]);
      }
    }

    if (skuIdsOfChoice.length > 0) {
      for (let i = 0; i < skuIdsOfChoice.length; i++) {
        skuIds.push(skuIdsOfChoice[i]);
      }
    }
    setCartButtonClicked(false);
    setCurrentSize('Select Size');
    setAllSizesAndQuantities(sizesAndQuantities);
    setAllSkuIds(skuIds);
  }, [skuOfChoice, styleChoice]);

  const selectedSizeHandler = (event) => {
    event.preventDefault();

    for (let i = 0; i < allSizesAndQuantities.length; i++) {
      if (allSizesAndQuantities[i].quantity === 0) {
        setCurrentSize('OUT OF STOCK');
        setOutOfStockState('OUT OF STOCK');
      } else if (event.target.value === allSizesAndQuantities[i].size) {
        setCurrentSize('');
        setCurrentQuantityAvailable(allSizesAndQuantities[i].quantity);
        setSingleSkuId(allSkuIds[i]);
        setOutOfStockState(null);
      }
    }
  };

  useEffect(() => {
    const integers = [];

    if (currentQuantityAvailable > 15) {
      for (let i = 1; i <= 15; i++) {
        integers.push(i);
      }
    } else {
      for (let i = 1; i <= currentQuantityAvailable || i === 15; i++) {
        integers.push(i);
      }
    }

    setQuantityAvailable(integers);
  }, [currentQuantityAvailable]);

  const quantitySelected = (event) => {
    event.preventDefault();

    for (let i = 0; i < quantityAvailable.length; i++) {
      if (parseInt(event.target.value) === quantityAvailable[i]) {
        setCountChosen(parseInt(event.target.value));
      }
    }
  };

  useEffect(() => {
    setSku_id(parseInt(singleSkuId));
  }, [currentSize, countChosen, singleSkuId]);

  const handleCart = (event) => {
    event.preventDefault();

    setCartButtonClicked(true);

    if (currentSize !== 'Select Size') {
      setIsOpen(true);
    }
  };

  const onClose = (event) => {
    event.preventDefault();

    axios
      .post('/cart', { sku_id: `${sku_id}`, count: `${countChosen}` })
      .then((status) => {
        console.log('Status: ', status);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });

    setIsOpen(false);
    setCartButtonClicked(false);
  };

  const exitCart = (event) => {
    event.preventDefault();

    if (event.key === 'Enter' || event.key === 'Space bar') {
      setIsOpen(false);
      setCartButtonClicked(false);
    }

    setIsOpen(false);
    setCartButtonClicked(false);
  };

  return (
    <>
      {(currentSize === 'Select Size' && cartButtonClicked === true)
        ? (
          <div className={styles.hiddenCartSentence}>Please select a size</div>
        )
        : null}
      <select role="tablist" aria-label="Select size" onChange={selectedSizeHandler} tabIndex={0} className={styles.sizeDropDown}>
        <option style={{ paddingLeft: '5px' }}>Select Size</option>
        {allSizesAndQuantities.map((productSize, index) => (
          <option role="tab" tabIndex={0} key={index}>{productSize.size}</option>
        ))}
      </select>
      <select role="tablist" aria-label="Select quantity" onChange={quantitySelected} tabIndex={0} className={styles.quantityDropDown}>
        <option role="tab" disabled>-</option>
        {quantityAvailable.map((num, index) => <option role="tab" tabIndex={0} key={index}>{num}</option>)}
      </select>
      <p style={{ color: 'red' }}>{outOfStockState}</p>
      <div role="tablist" className={styles.cart}>
        {currentSize !== 'OUT OF STOCK' && (<button type="submit" aria-label="Add to cart" role="tab" tabIndex={0} onClick={handleCart}>Add to Cart</button>)}
        <OverviewCartModal open={isOpen} close={onClose} exitCart={exitCart}>
          <form>
            Item:
            <p>{name}</p>
            <br />
            Style:
            <p>{styleChoice}</p>
            <br />
            Size:
            <p>8</p>
            <br />
            Quantity:
            <p>{countChosen}</p>
          </form>
        </OverviewCartModal>
      </div>
    </>
  );
};

export default OverviewSize;
