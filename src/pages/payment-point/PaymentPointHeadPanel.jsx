import React from 'react';
import { injectIntl } from 'react-intl';

import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  TextInput,
  FormPanel,
  withModulesManager,
  PublishedComponent,
} from '@openimis/fe-core';
import { MAX_LENGTH } from '../../constants';

const StyledPaymentPointHeadPanel = styled(Grid)(({ theme }) => ({
  '&.item': theme.paper.item,
}));

class PaymentPointHeadPanel extends FormPanel {
  render() {
    const { edited, readOnly } = this.props;
    const paymentPoint = { ...edited };
    return (
      <StyledPaymentPointHeadPanel container className="item">
        <Grid xs={12}>
          <PublishedComponent
            pubRef="location.DetailedLocation"
            withNull
            required
            readOnly={readOnly}
            filterLabels={false}
            value={paymentPoint?.location}
            onChange={(locations) => this.updateAttribute('location', locations)}
          />
        </Grid>
        <Grid xs={3} className="item">
          <PublishedComponent
            pubRef="admin.PaymentPointManagerPicker"
            required
            withPlaceholder
            withLabel
            readOnly={readOnly}
            value={paymentPoint?.ppm}
            onChange={(ppm) => this.updateAttribute('ppm', ppm)}
          />
        </Grid>
        <Grid xs={3} className="item">
          <TextInput
            module="payroll"
            label="paymentPoint.name"
            required
            readOnly={readOnly}
            inputProps={{ maxLength: MAX_LENGTH.NAME }}
            value={paymentPoint?.name}
            onChange={(name) => this.updateAttribute('name', name)}
          />
        </Grid>
      </StyledPaymentPointHeadPanel>
    );
  }
}

export default withModulesManager(injectIntl(PaymentPointHeadPanel));
