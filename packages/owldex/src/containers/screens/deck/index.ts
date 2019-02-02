import Deck from "./deck";

import { connect } from "react-redux";
import { getDeckCards } from "../../../selectors/selected";
import { withRouter } from "react-router";

const mapStateToProps = (state: any) => ({
  cards: getDeckCards(state).cards
});

export default withRouter(connect(mapStateToProps)(Deck));
