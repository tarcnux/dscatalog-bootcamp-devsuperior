import React from 'react';
import './styles.scss';
import {ReactComponent as ArrowIcon} from 'core/assets/images/arrow.svg';

const Pagination = () => {
    return (
        <div className="pagination-container">
            <ArrowIcon className="pagination-previous" />
            <div className="pagination-item active">1</div>
            <div className="pagination-item">2</div>
            <div className="pagination-item">3</div>
            <div className="pagination-item">4</div>
            <div className="pagination-item">5</div>
            <div className="pagination-item">6</div>
            <ArrowIcon className="pagination-next active"/>
        </div>
    );
}

export default Pagination;