import React from 'react';
import Loader from '../../Components/Loader';

function ManagementTable(props) {



    return (


        <div className="member-table-outter-wrapper">
            {props.loading
                ?
                <Loader loading={props.loading} />
                :
                props.fetchData.length === 0
                    ?
                    <p>查無搜尋結果</p>
                    :
                    <table className="review-card rwd-table">
                        <thead className="text-content-wrapper">
                            <tr>
                                {props.tableHead.map((head, index) =>
                                    <th key={index}>{head}</th>)}
                            </tr>
                        </thead>

                        <tbody key={props.tableData} className="card-content">
                            {props.tableData}
                        </tbody>
                    </table>
            }
        </div>
    );


}

export default ManagementTable;

