import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Cname: '',
    Cemail: '',
    CPhone: '',
    CDOJ: "",
    CDepartment: "",
    CSubDepartment: "",
    CState: "",
    CCity: "",
    CPin: "",
    CAnnual: "",
    CVariable: "",
    Cdesignation: '',
    Csalary: '',
    Mname: '',
    Mdesignation: ''
  });

  const [pdfUrl, setPdfUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://offer-tool-backend.onrender.com/', {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Convert the response to a Blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Set the PDF URL for preview
      setPdfUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `${formData.name}_offer_letter.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Enter Candidate Details</p>
        <input type="text" name="Cname" placeholder="Name" onChange={handleChange} />
        <input type="email" name="Cemail" placeholder="Email" onChange={handleChange} />
        <input type="text" name="Cdesignation" placeholder="Position" onChange={handleChange} />
        <input type="number" name="CPhone" placeholder="Phone Number" onChange={handleChange} />
        <input type="text" name="CDOJ" placeholder="Date of Joining" onChange={handleChange} />
        <input type="text" name="CDepartment" placeholder="Department" onChange={handleChange} />
        <input type="text" name="CSubDepartment" placeholder="Sub Department" onChange={handleChange} />
        <input type="text" name="CState" placeholder="State" onChange={handleChange} />
        <input type="text" name="CCity" placeholder="City" onChange={handleChange} />
        <input type="text" name="CPin" placeholder="Pincode" onChange={handleChange} />
        <input type="number" name="CAnnual" placeholder="Annual CTC" onChange={handleChange} />
        <input type="number" name="CVariable" placeholder="Variable(If Any)" onChange={handleChange} />
        <p>Enter Employement Agent Details</p>
        <input type="text" name="Mname" placeholder="Hiring Manager" onChange={handleChange} />
        <input type="text" name="Mdesignation" placeholder="Hiring Manager Designation" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>

      {pdfUrl && (
        <div className='preview'>
          <h3>PDF Preview:</h3>
          <iframe src={pdfUrl} width="600" height="800" title="PDF Preview"></iframe>
          <br />
          <button onClick={handleDownload}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default App;
