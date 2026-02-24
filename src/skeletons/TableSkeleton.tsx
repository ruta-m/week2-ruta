import React from 'react';

interface TableSkeletonProps {
    rows?: number; // How many fake data rows to show -- default = 5
    columns?: number; // How many fake data columns to show -- default = 4
    title?: string; // Optional -- grey bar where a section title would be
}

const shimmerCSS = `
@keyframes shimmer {
0% {background-position: -400px 0;}
100% {background-position: 400px 0;}
}
.sk {
background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
background-size: 400px 100%;
animation: shimmer 1.4s ease-in-out infinite;
border-radius: 4px;
height: 16px;
}
`;

const TableSkeleton: React.FC<TableSkeletonProps> = ({
    rows = 5, // 5 if caller doesn't specify
    columns = 4, // 4 if caller doesn't specify
    title,
}) => {
    return (
        <div style={{marginBottom: 24}}>
            {/* Inject the shimmer animation CSS */}
            <style>{shimmerCSS}</style>

            {/* If a title was given, show a grey bar where the heading would be */}
            {title && (
                <div className="sk" style={{width:200, height:24, marginBottom: 12}}/>
            )}

            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                {/* Header row */}
                <thead>
                    <tr style={{background: '#1E3A8A'}}>
                        {Array.from({length:columns}).map(function(_, columnIndex) {
                            return (
                                <th key={columnIndex} style={{padding:10, width: `${100/columns}%`}}>
                                    {/* Slightly lighter bar inside the dark header */}
                                    <div className="sk" style={{width: '70%', background: '#4B6FBF'}}/>
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                {/* Data rows */}
                <tbody>
                    {Array.from({length:rows}).map(function(_,rowIndex) {
                        // Alternate white and grey rows -- same as the real data table
                        var isEvenRow = rowIndex%2 === 0;
                        var rowBackground = isEvenRow ? '#fff' : '#F8FAFC';

                        return (
                            <tr key={rowIndex} style={{background: rowBackground}}>
                                {Array.from({length: columns}).map(function(_,columnIndex) {
                                    // Vary the bar width so they don't all look exactly the same

                                    // Pattern: 50%, 60%...
                                    var extraWidth = (columnIndex*10) % 40;
                                    var barWidth = 50 + extraWidth;

                                    return (
                                        <td key={columnIndex} style={{padding: 10}}>
                                            <div className="sk" style={{width:`${barWidth}%`}}/>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;