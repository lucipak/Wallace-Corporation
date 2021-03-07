import React, { useState, useEffect } from 'react';
import OverviewQuantity from './OverviewQuantity';

const OverviewSize = (props) => {
  // STILL TO DO:

  // Any style that has a quantity of 0 or null should not be listed in the size dropdown
  // If currentQuantityAvailable = 0 or null, set size selector to "OUT OF STOCK"

  const { skuOfChoice, styleChoice, name } = props;

  const [currentSize, setCurrentSize] = useState('');
  const [currentQuantityAvailable, setCurrentQuantityAvailable] = useState(null);
  const [singleSkuId, setSingleSkuId] = useState('');
  const [allSizesAndQuantities, setAllSizesAndQuantities] = useState([]);
  const [allSkuIds, setAllSkuIds] = useState([]);

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

    setAllSizesAndQuantities(sizesAndQuantities);
    setAllSkuIds(skuIds);
  }, [skuOfChoice, styleChoice]);


  const selectedSizeHandler = (event) => {
    event.preventDefault();

    for (let i = 0; i < allSizesAndQuantities.length; i++) {
      if (allSizesAndQuantities[i].quantity === 0) {
        continue;
      } else if (event.target.value === allSizesAndQuantities[i].size) {
        setCurrentQuantityAvailable(allSizesAndQuantities[i].quantity);
        setSingleSkuId(allSkuIds[i]);
      }
    }

    setCurrentSize(event.target.value);
  };

  // Line 43 is how to disable a button
  // function App() {

  //   const [name, setName] = useState('');
  //   const nameChange = e => setName(e.target.value);

  //   return (
  //     <div className="App">
  //       <input value={name} onChange={nameChange} placeholder="Name"/>
  //       <button disabled={!name}>Search</button>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (currentQuantityAvailable === null) {
      return (
        <div>
          <select disabled>
            <option>OUT OF STOCK</option>
          </select>
        </div>
      );
    }
  }, [currentQuantityAvailable]);

  return (
    <div>
      <select onChange={selectedSizeHandler}>
        <option>Select Size</option>
        {allSizesAndQuantities.map((productSize, index) => (
          <option key={index}>{productSize.size}</option>
        ))}
      </select>
      <div>
        <OverviewQuantity quantityForSize={currentQuantityAvailable} currentSize={currentSize} singleSkuId={singleSkuId} styleChoice={styleChoice} name={name} />
      </div>
    </div>
  );
};

export default OverviewSize;
