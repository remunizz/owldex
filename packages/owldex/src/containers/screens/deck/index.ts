import Deck from "./deck";

import { connect } from "react-redux";
import { getDeckCards, detailCard } from "../../../selectors/selected";
import { withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { removeCardFromDeck } from "../../../actions/entities";

const mapStateToProps = (state: any) => ({
  cards: getDeckCards(state).cards,
  detailCard: detailCard(state).cards
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      removeCardFromDeck
    },
    dispatch
  )
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Deck));
