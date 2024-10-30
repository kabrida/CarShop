import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import "./CarList.css";
import AddCar from "./AddCar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import EditCar from "./EditCar";
import { useQuery } from "@tanstack/react-query";

export default function CarList() {
    const [cars, setCars] = useState([]);


    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Brand', field: 'brand', sort: 'asc' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Color', field: 'color' },
        { headerName: 'Fuel', field: 'fuel' },
        { headerName: 'Year', field: 'modelYear' },
        { headerName: 'Price', field: 'price' },
        { headerName: '', 
            field: '_links.self.href',
            sortable: false,
            filter: false,
            cellRenderer: params => <EditCar editCar={editCar} currentCar={params.data} />
        },
        { headerName: '',
            field: '_links.self.href',
            sortable: false,
            filter: false,
            cellRenderer: params => <Button onClick={() => deleteCar(params.data)}>Delete</Button>
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    const autoSizeStrategy = {
        type: 'fitCellContents'
    }

    // Autotietojen hakufunktio
    const fetchCars = async () => {
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
            const data = await response.json();
            console.log('Fetched data:', data);
            setCars(data._embedded.cars);
        } catch (err) {
            console.error('Error fetching cars:', err);
        }
    };

    const deleteCar = async (car) => {
        const url = car._links.self.href;
        const options = {
            method: 'DELETE'
        }

        try {
            if (confirm(`Are you sure you want to delete the car ${car.brand} ${car.model}?`)) {
            const response = await fetch(url, options);
            fetchCars();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const addCar = async (car) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        }
    
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', options);
            const data = await response.json();
            console.log("Added car:", data);
            fetchCars();
        } catch (err) {
            console.error('Error adding car:', err);
        }
    };

    const editCar = async (url, car) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            fetchCars();
        } catch (err) {
            console.error('Error adding car:', err);
        }
    }


    useEffect(() => fetchCars, []);


    return (
        <div className="CarList">
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{width: '95%', height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={cars}
                defaultColDef={defaultColDef}
                autoSizeStrategy={autoSizeStrategy}
                accentedSort =  {true}
            />
            </div>
        </div>
    );

}
