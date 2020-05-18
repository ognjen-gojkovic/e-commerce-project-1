import React, { Component } from "react";
import ShopData from "./data";
import CollectionPreview from "../../components/previewCollection/previewCollection";

export class ShopPage extends Component {
  constructor(props) {
    super();

    this.state = {
      collections: ShopData,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
