import { connect } from "react-redux";
import { MarketComponent } from "./market";
import { Dispatch, bindActionCreators } from "redux";
import { fetchSet, addCardToDeck } from "../../../actions/entities";
import {
  getCards,
  detailCard,
  getDeckCardIds,
  getMarketLoadingStatus,
  getMarketAlerts
} from "../../../selectors/selected";
import { withRouter } from "react-router";

const mapStateToProps = (state: any) => ({
  cards: getCards(state).cards,
  deckCards: getDeckCardIds(state),
  detailCard: detailCard(state).cards,
  loadingStatus: getMarketLoadingStatus(state),
  alert: getMarketAlerts(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      fetchSet,
      addCardToDeck
    },
    dispatch
  )
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketComponent)
);
