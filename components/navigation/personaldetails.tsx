import React, { useState } from 'react';


const App = () => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [community, setCommunity] = useState('');
  const [guthiName, setGuthiName] = useState('');
  const [landNo, setLandNo] = useState('');
  const [locality, setLocality] = useState('');

  return (
    <div className="container">
      <h1>INDICATIVE INFORMATION</h1>
      <div className="form-group">
        <label>Province</label>
        <select value={province} onChange={(e) => setProvince(e.target.value)}>
          <option value="">Select Province</option>
          {/* Add options here */}
        </select>
      </div>
      <div className="form-group">
        <label>District</label>
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          {/* Add options here */}
        </select>
      </div>
      <div className="form-group">
        <label>Local Forest Community FUG</label>
        <input type="text" value={community} onChange={(e) => setCommunity(e.target.value)} />
      </div>
      <div className="form-group">
        <button>Select Your LC</button>
        <button>Enter Data</button>
      </div>
      <div className="form-group">
        <label>Guthi Name</label>
        <input type="text" value={guthiName} onChange={(e) => setGuthiName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Enter Land No.</label>
        <input type="text" value={landNo} onChange={(e) => setLandNo(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Locality</label>
        <select value={locality} onChange={(e) => setLocality(e.target.value)}>
          <option value="">Select Locality</option>
          {/* Add options here */}
        </select>
      </div>
      <div className="form-group">
        <button>Back</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default App;
