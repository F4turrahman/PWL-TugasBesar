import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCharts } from '../../redux/Slice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Statistik Barang Terjual',
        },
    },
};

export function ChartVert() {
    const dataCount = useSelector((state) => state.store?.charts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!Array.isArray(dataCount)) {
            dispatch(getCharts());
        }
    }, [dataCount, dispatch]);

    const months = (Array.isArray(dataCount) ? dataCount : []).map(item => Object.keys(item)[0] || '');
    const values = (Array.isArray(dataCount) ? dataCount : []).map(item => Object.values(item)[0] || '');

    const data = {
        labels: months,
        datasets: [
            {
                label: '',
                data: values,
                backgroundColor: '#3e93ff',
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar options={options} data={data} />
        </div>
    );
}
