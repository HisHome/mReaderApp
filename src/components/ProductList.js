import React from 'react';
import PropTypes from 'prop-types';

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <div>
            卡卡的饭卡上咔咔寿
        </div>
      );
    },
  }];
  return (
    <div>
        {
            products && products.map((item)=>{
                return `${item.title}--${item.value}----`
            })
        }
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;