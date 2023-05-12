import { useState, useRef } from 'react';

import { useState } from 'react';
import Papa from 'papaparse';

export default function PortfolioManager() {
  const [csvFile, setCsvFile] = useState(null);

  const columnMapping = {
    0: 'date',
    2: 'productName',
    3: 'productCode',
    6: 'quantityChange',
    11: 'totalBalanceChange',
    14: 'commission',
    17: 'currency'
  };

  const currencySymbols = {
    EUR: '€',
    USD: '$'
  };

  const loadCsv = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (res) => {
      parseCsv(res.target.result);
    }
    reader.onerror = (err) => console.log(err)
    reader.readAsText(file)
  };

  const parseCsv = (fileContents) => {
    var rawLines = Papa.parse(fileContents).data.reverse();
    var parsedLines = [];

    // Loop ends in length -1, because the list is reversed, soo last line is headers
    for (let i = 0; i < (rawLines.length - 1); i++) {
      const lineData = {};
      Object.entries(columnMapping).forEach(([key, value]) => {
        lineData[value] = rawLines[i][key];
      });

      lineData.quantityChange = Math.abs(parseInt((lineData.quantityChange || '')));
      lineData.totalBalanceChange = parseFloat((lineData.totalBalanceChange || '').replace(',', '.'));
      lineData.commission = parseFloat((lineData.commission || '').replace(',', '.'));

      lineData.currencySymbol = (lineData.currency || '').toUpperCase();
      if (lineData.currencySymbol in currencySymbols) {
        lineData.currencySymbol = currencySymbols[lineData.currencySymbol];
      }

      lineData.isPurchase = (lineData.totalBalanceChange < 0);
      lineData.totalBalanceChange = Math.abs(lineData.totalBalanceChange);
      lineData.averagePrice = lineData.totalBalanceChange / lineData.quantityChange;

      if (lineData.date !== '') {
        parsedLines.push(lineData);
      }
    }

    // Replace these with the corresponding Next.js data store mechanism (e.g. Redux, React Context)
    console.log('loadRawRows', parsedLines);
    console.log('processData');
  };

  const [csvData, setCsvData] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csvData = reader.result as string;
      setCsvData(csvData);
    };
  }

  return (
    <div>
      <h1>In depth analysis on all your positions</h1>
      <p className="fs-5 col-md-10">
        This tools is a quickly and easy way to build your taxes statements and know where you could save a buck or more.
        <br />
        Get started by Selecting a Transactions History Report from Degiro in .csv format.
      </p>

      <div className="mb-5">
        <input
          ref={fileInputRef}
          accept=".csv"
          className="visually-hidden"
          type="file"
          onChange={handleFileInputChange}
        />
        <button className="btn btn-primary btn-lg px-4" onClick={() => fileInputRef.current?.click()}>
          Select Transactions CSV
        </button>
      </div>

      <hr className="col-3 col-md-2 mb-5" />

      <div className="row g-5">
        <div className="col-md-6">
          <h2>Privacy First</h2>
          <p>
            Everything is processed locally on your browser, and the file that you pick never leaves your machine.
            <br />
            This is an open source project, soo you can see by yourself what is being done to your data.
          </p>
          <ul className="icon-list">
            <li>
              <a href="https://github.com/G4brym/Degiro-Portfolio-Manager" rel="noopener" target="_blank">
                Degiro Portfolio Manager on Github
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <h2>Guides</h2>
          <p>Read more detailed instructions and documentation on using the Degiro Portfolio Manager.</p>
          <ul className="icon-list">
            <li>
              <a
                href="https://github.com/G4brym/Degiro-Portfolio-Manager/tree/master/docs/extract-transactions-list.md"
                rel="noopener"
                target="_blank"
              >
                How to extract your Transactions history from Degiro
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}