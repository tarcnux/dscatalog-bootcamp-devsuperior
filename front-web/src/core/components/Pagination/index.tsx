import React from 'react';
import './styles.scss';
import {ReactComponent as ArrowIcon} from 'core/assets/images/arrow.svg';
import { generateList } from 'core/utils/list';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {
    const items = generateList(totalPages);
    const previousClass = totalPages > 0 && activePage > 0 ? 'active' : '';
    const nextClass = totalPages > 0 && activePage < totalPages - 1 ? 'active' : '';

    return (
        <div className="pagination-container">
            <ArrowIcon
                onClick={() => onChange(activePage - 1)}
                className={`pagination-previous ${previousClass}`} />
            {items.map(item => (
                <div
                    onClick={() => onChange(item)}
                    className={`pagination-item ${item === activePage ? 'active' : ''} `} 
                    key={item}>

                    {item + 1}
                </div>
            ))}
            
            
            <ArrowIcon
                onClick={() => onChange(activePage + 1)}
                className={`pagination-next ${nextClass}`}/>
        </div>
    );
}

export default Pagination;