import React from 'react';
import _debounce from 'lodash/debounce';

import { FormControlLabel, Grid, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  TextInput,
  ControlledField,
  useModulesManager,
  useTranslations,
  PublishedComponent,
  decodeId,
  GRID_RESPONSIVE_STANDARD,
} from '@openimis/fe-core';
import {
  CONTAINS_LOOKUP,
  DEFAULT_DEBOUNCE_TIME,
  EMPTY_STRING,
  MODULE_NAME,
} from '../../constants';
import PayrollStatusPicker from './PayrollStatusPicker';
import PaymentMethodPicker from '../../pickers/PaymentMethodPicker';

const StyledPayrollFilter = styled('div')(({ theme }) => ({
  '& .form': {
    padding: theme.spacing(1),
    width: '100%',
  },
  '& .item': {
    padding: theme.spacing(1),
  },
}));

function PayrollFilter({
  filters, onChangeFilters, statusReadOnly = false,
}) {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);

  const debouncedOnChangeFilters = _debounce(onChangeFilters, DEFAULT_DEBOUNCE_TIME);

  const filterTextFieldValue = (filterName) => filters?.[filterName]?.value ?? EMPTY_STRING;

  const filterValue = (filterName) => filters?.[filterName]?.value ?? null;

  const onChangeStringFilter = (filterName, lookup = null) => (value) => {
    if (lookup) {
      debouncedOnChangeFilters([
        {
          id: filterName,
          value,
          filter: `${filterName}_${lookup}: "${value}"`,
        },
      ]);
    } else {
      debouncedOnChangeFilters([
        {
          id: filterName,
          value,
          filter: `${filterName}: "${value}"`,
        },
      ]);
    }
  };

  return (
    <StyledPayrollFilter>
      <Grid container className="form">
        <Grid size={GRID_RESPONSIVE_STANDARD} className="item">
          <TextInput
            module="payroll"
            label="payroll.payroll.name"
            value={filterTextFieldValue('name')}
            onChange={onChangeStringFilter('name', CONTAINS_LOOKUP)}
          />
        </Grid>
        <Grid size={GRID_RESPONSIVE_STANDARD} className="item">
          <PublishedComponent
            pubRef="contributionPlan.PaymentPlanPicker"
            filters={filters}
            value={filterValue('paymentPlan_Id')}
            onChange={(paymentPlan) => onChangeFilters([
              {
                id: 'paymentPlan_Id',
                value: paymentPlan,
                filter: `paymentPlan_Id: "${paymentPlan?.id && decodeId(paymentPlan.id)}"`,
              },
            ])}
          />
        </Grid>
        <Grid size={GRID_RESPONSIVE_STANDARD} className="item">
          <PublishedComponent
            pubRef="payroll.PaymentPointPicker"
            withLabel
            withPlaceholder
            filters={filters}
            value={filterValue('paymentPoint_Id')}
            onChange={(paymentPoint) => onChangeFilters([
              {
                id: 'paymentPoint_Id',
                value: paymentPoint,
                filter: `paymentPoint_Id: "${paymentPoint?.id && decodeId(paymentPoint.id)}"`,
              },
            ])}
          />
        </Grid>
        <Grid size={GRID_RESPONSIVE_STANDARD} className="item">
          <PublishedComponent
            pubRef="paymentCycle.PaymentCyclePicker"
            withLabel
            withPlaceholder
            filters={filters}
            value={filterValue('paymentCycle_Id')}
            onChange={(paymentCycle) => onChangeFilters([
              {
                id: 'paymentCycle_Id',
                value: paymentCycle,
                filter: `paymentCycle_Id: "${paymentCycle?.id && decodeId(paymentCycle.id)}"`,
              },
            ])}
          />
        </Grid>
        <Grid size={GRID_RESPONSIVE_STANDARD} className="item">
          <PayrollStatusPicker
            withNull
            nullLabel="payroll.tooltip.any"
            label="payroll.payroll.payrollStatusPicker"
            value={filterValue('status')}
            readOnly={statusReadOnly}
            onChange={(value) => onChangeFilters([
              {
                id: 'status',
                value,
                filter: value ? `status: ${value}` : EMPTY_STRING,
              },
            ])}
          />
        </Grid>
        <Grid size={GRID_RESPONSIVE_STANDARD} className="item">
          <PaymentMethodPicker
            withNull
            nullLabel="payroll.tooltip.any"
            label="payroll.paymentMethod"
            value={filterValue('paymentMethod')}
            onChange={(value) => onChangeFilters([
              {
                id: 'paymentMethod',
                value,
                filter: `paymentMethod: "${value}"`,
              },
            ])}
          />
        </Grid>
        <ControlledField
          module="payroll"
          id="payrollFilter.showHistory"
          field={(
            <Grid size={12} className="item">
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    checked={!!filters?.isDeleted?.value}
                    onChange={() => onChangeFilters([
                      {
                        id: 'isDeleted',
                        value: !filters?.isDeleted?.value,
                        filter: `isDeleted: ${!filters?.isDeleted?.value}`,
                      },
                    ])}
                  />
                )}
                label={formatMessage('tooltip.isDeleted')}
              />
            </Grid>
          )}
        />
      </Grid>
    </StyledPayrollFilter>
  );
}

export default PayrollFilter;
