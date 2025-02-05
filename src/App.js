import React, { useState } from 'react';

const WheatCalculator = () => {
  const [springArea, setSpringArea] = useState('');
  const [springYield, setSpringYield] = useState('');
  const [autumnArea, setAutumnArea] = useState('');
  const [autumnYield, setAutumnYield] = useState('');
  const [springResult, setSpringResult] = useState(null);
  const [autumnResult, setAutumnResult] = useState(null);
  const [soyArea, setSoyArea] = useState('');
  const [soyYield, setSoyYield] = useState('');
  const [isPaddyField, setIsPaddyField] = useState(true);
  const [soyResult, setSoyResult] = useState(null);
  const [yumeArea, setYumeArea] = useState('');
  const [yumeYield, setYumeYield] = useState('');
  const [nanatsuArea, setNanatsuArea] = useState('');
  const [nanatsuYield, setNanatsuYield] = useState('');
  const [isRenovation, setIsRenovation] = useState(false);
  const [yumeResult, setYumeResult] = useState(null);
  const [nanatsuResult, setNanatsuResult] = useState(null);

  const [foodYumeArea, setFoodYumeArea] = useState('');
  const [foodYumeYield, setFoodYumeYield] = useState('');
  const [foodYumeToDealer, setFoodYumeToDealer] = useState('');
  const [foodYumeToMeijiya, setFoodYumeToMeijiya] = useState('');
  const [foodNanatsuArea, setFoodNanatsuArea] = useState('');
  const [foodNanatsuYield, setFoodNanatsuYield] = useState('');
  const [foodNanatsuToDealer, setFoodNanatsuToDealer] = useState('');
  const [foodNanatsuToMeijiya, setFoodNanatsuToMeijiya] = useState('');
  const [foodYumeResult, setFoodYumeResult] = useState(null);
  const [foodNanatsuResult, setFoodNanatsuResult] = useState(null);
  const [totalNanatsuSacks, setTotalNanatsuSacks] = useState(0);
  const [processingRiceArea, setProcessingRiceArea] = useState('');
  const [processingRiceYield, setProcessingRiceYield] = useState('');
  const [isRenovation1, setIsRenovation1] = useState(false);
  const [processingRiceResult, setProcessingRiceResult] = useState(null);

  const calculateSpring = () => {
    const areaValue = parseFloat(springArea);
    const yieldValue = parseFloat(springYield);
    if (isNaN(areaValue) || isNaN(yieldValue)) return;

    const cost = Math.floor((areaValue / 10) * 23137) + 2610;
    const areaPayment = Math.floor((areaValue / 10) * 20000);
    let quantityPayment = Math.floor((yieldValue * 7680 * (areaValue / 10)) - areaPayment);
    if (quantityPayment < 0) {
      quantityPayment = 0;
    }
    const farmlandUtilization = Math.floor((areaValue / 10) * 35000);
    const regionalGrant = Math.floor((areaValue / 10) * 9000);
    const wheatRevenueBeforeAdjustments = Math.floor((yieldValue * 3371 * (areaValue / 10)));
    const adjustmentFee = Math.floor((yieldValue * 780 * (areaValue / 10)));
    const wheatRevenue = wheatRevenueBeforeAdjustments - adjustmentFee;
    
    const totalIncome = areaPayment + quantityPayment + farmlandUtilization + regionalGrant + wheatRevenue;
    const profit = totalIncome - cost;
    
    setSpringResult({
      areaPayment,
      quantityPayment,
      farmlandUtilization,
      regionalGrant,
      wheatRevenue,
      totalIncome,
      cost,
      profit,
    });
  };

  const calculateAutumn = () => {
    const areaValue = parseFloat(autumnArea);
    const yieldValue = parseFloat(autumnYield);
    if (isNaN(areaValue) || isNaN(yieldValue)) return;

    const cost = Math.floor((areaValue / 10) * 24683);
    const areaPayment = Math.floor((areaValue / 10) * 20000);
    let quantityPayment = Math.floor((yieldValue * 7860 * (areaValue / 10)) - areaPayment);
    if (quantityPayment < 0) {
      quantityPayment = 0;
    }
    const farmlandUtilization = Math.floor((areaValue / 10) * 35000);
    const regionalGrant = Math.floor((areaValue / 10) * 9000);
    const wheatRevenueBeforeAdjustments = Math.floor((yieldValue * 2321 * (areaValue / 10)));
    const adjustmentFee =  Math.floor((yieldValue * 780 * (areaValue / 10)));
    const wheatRevenue = wheatRevenueBeforeAdjustments - adjustmentFee;
    
    const totalIncome = areaPayment + quantityPayment + farmlandUtilization + regionalGrant + wheatRevenue;
    const profit = totalIncome - cost;
    
    setAutumnResult({
      areaPayment,
      quantityPayment,
      farmlandUtilization,
      regionalGrant,
      wheatRevenue,
      totalIncome,
      cost,
      profit,
    });

  };
  
  const calculateSoy = () => {
    const areaValue = parseFloat(soyArea);
    const yieldValue = parseFloat(soyYield);
    if (isNaN(areaValue) || isNaN(yieldValue)) return;

    const cost = Math.floor((areaValue / 10) * 34325);
    const soyRevenue = Math.floor(yieldValue * 22000 * (areaValue / 10));
    const farmlandUtilization = isPaddyField ? Math.floor((areaValue / 10) * 35000) : 0;
    const regionalGrant = isPaddyField ? Math.floor((areaValue / 10) * 9000) : 0;
    
    const totalIncome = soyRevenue + farmlandUtilization + regionalGrant;
    const profit = totalIncome - cost;
    
    setSoyResult({ soyRevenue, farmlandUtilization, regionalGrant, totalIncome, cost, profit });
  };

  const calculateRice = (area, yieldValue, pricePerSack, setResult) => {
    const areaValue = parseFloat(area);
    const yieldVal = parseFloat(yieldValue);
    if (isNaN(areaValue) || isNaN(yieldVal)) return;

    const cost = Math.floor((areaValue / 10) * 30323);
    const farmlandUtilization = Math.floor((areaValue / 10) * (isRenovation ? 40000 : 20000));
    const regionalGrant = Math.floor((areaValue / 10) * 35000);
    const riceRevenue = Math.floor(yieldVal * pricePerSack * (areaValue / 10));
    const totalIncome = farmlandUtilization + regionalGrant + riceRevenue;
    const profit = totalIncome - cost;

    setResult({ farmlandUtilization, regionalGrant, riceRevenue, totalIncome, cost, profit });
  };

  const calculateFoodRice = (area, yieldValue, toDealer, toMeijiya, setResult) => {
    const areaValue = parseFloat(area);
    const yieldVal = parseFloat(yieldValue);
    const dealerVal = parseFloat(toDealer);
    const meijiyaVal = parseFloat(toMeijiya);
    if (isNaN(areaValue) || isNaN(yieldVal) || isNaN(dealerVal) || isNaN(meijiyaVal)) return;

    const cost = Math.floor((areaValue / 10) * 30323);
    const dealerRevenue =  Math.floor(dealerVal * 25000);
    const meijiyaRevenue =  Math.floor(meijiyaVal * 35000);
    const totalRevenue = dealerRevenue + meijiyaRevenue;
    const profit = totalRevenue - cost;

    setResult({ dealerRevenue, meijiyaRevenue, totalRevenue, cost, profit });
  };

  const handleNanatsuYieldChange = (e) => {
    setFoodNanatsuYield(e.target.value);
    if (foodNanatsuArea && e.target.value) {
      setTotalNanatsuSacks((parseFloat(e.target.value) * (parseFloat(foodNanatsuArea) / 10)).toFixed(2));
      calculateNanatsuRevenue(foodNanatsuArea, e.target.value);
    } else {
      setTotalNanatsuSacks(0);
    }
  };

  const calculateNanatsuRevenue = (area, yieldValue) => {
    const areaValue = parseFloat(area);
    const yieldVal = parseFloat(yieldValue);
    if (isNaN(areaValue) || isNaN(yieldVal)) return;

    const totalSacks = yieldVal * (areaValue / 10);
    const cost = Math.floor((areaValue / 10) * 30323);
    const totalRevenue = Math.floor((yieldVal * 23000) * (areaValue / 10));
    const profit = totalRevenue - cost;

    setFoodNanatsuResult({ totalSacks, totalRevenue, cost, profit });
  };

  const calculateProcessingRice = () => {
    const areaValue = parseFloat(processingRiceArea);
    const yieldValue = parseFloat(processingRiceYield);
    if (isNaN(areaValue) || isNaN(yieldValue)) return;

    const cost = Math.floor((areaValue / 10) * 30323);
    const farmlandUtilization = Math.floor((areaValue / 10) * (isRenovation1 ? 30000 : 20000));
    const regionalGrant = Math.floor((areaValue / 10) * 18000);
    const revenue = Math.floor((yieldValue * 10500) * (areaValue / 10));
    const totalIncome = farmlandUtilization + regionalGrant + revenue;
    const profit = totalIncome - cost;

    setProcessingRiceResult({ farmlandUtilization, regionalGrant, revenue, totalIncome, cost, profit });
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ fontSize: '20px', padding: '20px',  }}>
      <h2>春小麦収益計算</h2>
      <label>
        面積 (a):
        <input type="number" value={springArea} onChange={(e) => setSpringArea(e.target.value)} />
      </label>
      <br />
      <label>
        収穫量 (俵):
        <input type="number" value={springYield} onChange={(e) => setSpringYield(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateSpring}>計算</button>
      {springResult && (
        <div>
          <h3>結果</h3>
          <p>面積払い: {springResult.areaPayment.toLocaleString()} 円</p>
          <p>数量払い: {springResult.quantityPayment.toLocaleString()} 円</p>
          <p>水田活用: {springResult.farmlandUtilization.toLocaleString()} 円</p>
          <p>産地交付金: {springResult.regionalGrant.toLocaleString()} 円</p>
          <p>春小麦販売収入: {springResult.wheatRevenue.toLocaleString()} 円</p>
          <p>経費: {springResult.cost.toLocaleString()} 円</p>
          <h4 style={{ color: "red" }}>合計収入: {springResult.totalIncome.toLocaleString()} 円</h4>
          <h4>最終利益: {springResult.profit.toLocaleString()} 円</h4>
        </div>
      )}
    </div>


    <div style={{ fontSize: '20px', padding: '20px',  }}>
      <h2>秋小麦収益計算</h2>
      <label>
        面積 (a):
        <input type="number" value={autumnArea} onChange={(e) => setAutumnArea(e.target.value)} />
      </label>
      <br />
      <label>
        収穫量 (俵):
        <input type="number" value={autumnYield} onChange={(e) => setAutumnYield(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateAutumn}>計算</button>
      {autumnResult && (
        <div>
          <h3>結果</h3>
          <p>面積払い: {autumnResult.areaPayment.toLocaleString()} 円</p>
          <p>数量払い: {autumnResult.quantityPayment.toLocaleString()} 円</p>
          <p>水田活用: {autumnResult.farmlandUtilization.toLocaleString()} 円</p>
          <p>産地交付金: {autumnResult.regionalGrant.toLocaleString()} 円</p>
          <p>秋小麦販売収入: {autumnResult.wheatRevenue.toLocaleString()} 円</p>
          <p>経費: {autumnResult.cost.toLocaleString()} 円</p>
          <h4 style={{ color: "red" }}>合計収入: {autumnResult.totalIncome.toLocaleString()} 円</h4>
          <h4>最終利益: {autumnResult.profit.toLocaleString()} 円</h4>
        </div>
      )}
    </div>

<div style={{ fontSize: '20px', padding: '20px' }}>
<h2>黒大豆収益計算</h2>
<label>
  面積 (a):
  <input type="number" value={soyArea} onChange={(e) => setSoyArea(e.target.value)} />
</label>
<br />
<label>
  収穫量 (俵):
  <input type="number" value={soyYield} onChange={(e) => setSoyYield(e.target.value)} />
</label>
<br />
<label>
  水田で栽培:
  <input type="checkbox" checked={isPaddyField} onChange={() => setIsPaddyField(!isPaddyField)} />
</label>
<br />
<button onClick={calculateSoy}>計算</button>
{soyResult && (
  <div>
    <h3>結果</h3>
    <p>黒大豆販売収入: {soyResult.soyRevenue.toLocaleString()} 円</p>
    <p>水田活用: {soyResult.farmlandUtilization.toLocaleString()} 円</p>
    <p>産地交付金: {soyResult.regionalGrant.toLocaleString()} 円</p>
    <p>経費: {soyResult.cost.toLocaleString()} 円</p>
    <h4 style={{ color: "red" }}>合計収入: {soyResult.totalIncome.toLocaleString()} 円</h4>
    <h4>最終利益: {soyResult.profit.toLocaleString()} 円</h4>
  </div>
)}
</div>

<div style={{ fontSize: '20px', padding: '20px' }}>
      <h2>輸出ゆめぴりか収益計算</h2>
      <label>
        面積 (a):
        <input type="number" value={yumeArea} onChange={(e) => setYumeArea(e.target.value)} />
      </label>
      <br />
      <label>
        収穫量 (俵):
        <input type="number" value={yumeYield} onChange={(e) => setYumeYield(e.target.value)} />
      </label>
      <br />
      <label>
        リノベーション採択:
        <input type="checkbox" checked={isRenovation} onChange={() => setIsRenovation(!isRenovation)} />
      </label>
      <br />
      <button onClick={() => calculateRice(yumeArea, yumeYield, 11000, setYumeResult)}>計算</button>
      {yumeResult && (
        <div>
          <h3>結果</h3>
          <p>水田活用収入: {yumeResult.farmlandUtilization.toLocaleString()} 円</p>
          <p>産地交付金: {yumeResult.regionalGrant.toLocaleString()} 円</p>
          <p>販売収入: {yumeResult.riceRevenue.toLocaleString()} 円</p>
          <p>経費: {yumeResult.cost.toLocaleString()} 円</p>
          <h4 style={{ color: "red" }}>合計収入: {yumeResult.totalIncome.toLocaleString()} 円</h4>
          <h4>最終利益: {yumeResult.profit.toLocaleString()} 円</h4>
        </div>
      )}

   <h2>輸出ななつぼし収益計算</h2>
      <label>
        面積 (a):
        <input type="number" value={nanatsuArea} onChange={(e) => setNanatsuArea(e.target.value)} />
      </label>
      <br />
      <label>
        収穫量 (俵):
        <input type="number" value={nanatsuYield} onChange={(e) => setNanatsuYield(e.target.value)} />
      </label>
      <br />
      <button onClick={() => calculateRice(nanatsuArea, nanatsuYield, 10000, setNanatsuResult)}>計算</button>

      {nanatsuResult && (
        <div>
          <h3>結果</h3>
          <p>水田活用収入: {nanatsuResult.farmlandUtilization.toLocaleString()} 円</p>
          <p>産地交付金: {nanatsuResult.regionalGrant.toLocaleString()} 円</p>
          <p>販売収入: {nanatsuResult.riceRevenue.toLocaleString()} 円</p>
          <p>経費: {nanatsuResult.cost.toLocaleString()} 円</p>
          <h4 style={{ color: "red" }}>合計収入: {nanatsuResult.totalIncome.toLocaleString()} 円</h4>
          <h4>最終利益: {nanatsuResult.profit.toLocaleString()} 円</h4>
        </div>
      )}
    </div>
    </div>

    <div style={{ fontSize: '20px', padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>食用米（ゆめぴりか）収益計算</h2>
        <label>
          面積 (a):
          <input type="number" value={foodYumeArea} onChange={(e) => setFoodYumeArea(e.target.value)} />
        </label>
        <br />
        <label>
          収穫量 (俵):
          <input type="number" value={foodYumeYield} onChange={(e) => setFoodYumeYield(e.target.value)} />
           <p>合計俵数: {foodYumeYield && foodYumeArea ? (parseFloat(foodYumeYield) * (parseFloat(foodYumeArea) / 10)).toFixed(2) : 0} 俵</p>
        </label>
        <br />
        <label>
          業者に出す量 (俵):
          <input type="number" value={foodYumeToDealer} onChange={(e) => setFoodYumeToDealer(e.target.value)} />
        </label>
        <br />
        <label>
          明治屋に出す量 (俵):
          <input type="number" value={foodYumeToMeijiya} onChange={(e) => setFoodYumeToMeijiya(e.target.value)} />
        </label>
        <br />
        <button onClick={() => calculateFoodRice(foodYumeArea, foodYumeYield, foodYumeToDealer, foodYumeToMeijiya, setFoodYumeResult)}>計算</button>
        {foodYumeResult && (
          <div>
            <h3 style={{ color: 'red' }}>結果</h3>
            <p>業者販売収入: {foodYumeResult.dealerRevenue.toLocaleString()} 円</p>
            <p>明治屋販売収入: {foodYumeResult.meijiyaRevenue.toLocaleString()} 円</p>
            <p style={{ color: 'red' }}>合計販売収入: {foodYumeResult.totalRevenue.toLocaleString()} 円</p>
            <p>経費: {foodYumeResult.cost.toLocaleString()} 円</p>
            <h4>最終利益: {foodYumeResult.profit.toLocaleString()} 円</h4>
          </div>
        )}
      </div>
      
      <div style={{ fontSize: '20px', padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>食用米（ななつぼし）収益計算</h2>
        <label>
          面積 (a):
          <input type="number" value={foodNanatsuArea} onChange={(e) => setFoodNanatsuArea(e.target.value)} />
        </label>
        <br />
        <label>
          収穫量 (俵):
          <input type="number" value={foodNanatsuYield} onChange={handleNanatsuYieldChange} />
        </label>
        <br />
        <p>合計俵数: {totalNanatsuSacks} 俵</p>
        {foodNanatsuResult && (
          <div>
            <h3 style={{ color: 'red' }}>結果</h3>
            <p>合計販売収入: {foodNanatsuResult.totalRevenue.toLocaleString()} 円</p>
            <p>経費: {foodNanatsuResult.cost.toLocaleString()} 円</p>
            <h4>最終利益: {foodNanatsuResult.profit.toLocaleString()} 円</h4>
          </div>
        )}
      </div>
    </div>

    <div style={{ fontSize: '20px', padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2 style={{ color: 'red' }}>加工米収益計算</h2>
        <label>
          面積 (a):
          <input type="number" value={processingRiceArea} onChange={(e) => setProcessingRiceArea(e.target.value)} />
        </label>
        <br />
        <label>
          収穫量 (俵):
          <input type="number" value={processingRiceYield} onChange={(e) => setProcessingRiceYield(e.target.value)} />
        </label>
        <br />
        <label>
          リノベーション採択:
          <input type="checkbox" checked={isRenovation1} onChange={() => setIsRenovation1(!isRenovation1)} />
        </label>
        <br />
        <button onClick={calculateProcessingRice}>計算</button>
        {processingRiceResult && (
          <div>
            <h3 style={{ color: 'red' }}>結果</h3>
            <p>水田活用収入: {processingRiceResult.farmlandUtilization.toLocaleString()} 円</p>
            <p>産地交付金: {processingRiceResult.regionalGrant.toLocaleString()} 円</p>
            <p>販売収入: {processingRiceResult.revenue.toLocaleString()} 円</p>
            <p>経費: {processingRiceResult.cost.toLocaleString()} 円</p>
            <h4>合計収入: {processingRiceResult.totalIncome.toLocaleString()} 円</h4>
            <h4>最終利益: {processingRiceResult.profit.toLocaleString()} 円</h4>
          </div>
        )}
      </div>
    </div>
    </div>
</>
  );
};

export default WheatCalculator;
