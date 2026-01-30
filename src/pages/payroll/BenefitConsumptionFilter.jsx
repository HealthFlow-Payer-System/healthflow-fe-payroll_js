import React from 'react';
import _debounce from 'lodash/debounce';

import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  PublishedComponent,
  useModulesManager,
  useTranslations,
  TextInput,
  NumberInput,
} from '@openimis/fe-core';
import { CONTAINS_LOOKUP, DEFAULT_DEBOUNCE_TIME, EMPTY_STRING } from '../../constants';
import BenefitConsumptionStatusPicker from '../../pickers/BenefitConsumptionStatusPicker';

const StyledBenefitConsumptionFilter = styled('div')(({ theme }) => ({
  '& .form': {
    padding: 0,
  },
  '& .item': {
    padding: theme.spacing(1),
  },
}));

function BenefitConsumptionFilter({ filters, onChangeFilters }) {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations('payroll', modulesManager);

  const debouncedOnChangeFilters = _debounce(onChangeFilters, DEFAULT_DEBOUNCE_TIME);

  const filterTextFieldValue = (filterName) => filters?.[filterName]?.value ?? EMPTY_STRING;

  const filterValue = (filterName) => filters?.[filterName]?.value ?? null;

  const onChangeFilter = (filterName) => (value) => {
    debouncedOnChangeFilters([
      {
        id: filterName,
        value: value || null,
        filter: `${filterName}: ${value}`,
      },
    ]);
  };

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
    <StyledBenefitConsumptionFilter>
      <Grid container className="form">
        <Grid size={2} className="item">
        <TextInput
          module="payroll"
          label="benefitConsumption.individual.firstName"
          value={filterTextFieldValue('individual_FirstName')}
          onChange={onChangeStringFilter('individual_FirstName', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid size={2} className="item">
        <TextInput
          module="payroll"
          label="benefitConsumption.individual.lastName"
          value={filterTextFieldValue('individual_LastName')}
          onChange={onChangeStringFilter('individual_LastName', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid size={2} className="item">
        <TextInput
          module="payroll"
          label="benefitConsumption.photo"
          value={filterTextFieldValue('photo')}
          onChange={onChangeStringFilter('photo', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid size={2} className="item">
        <TextInput
          module="payroll"
          label="benefitConsumption.code"
          value={filterTextFieldValue('code')}
          onChange={onChangeStringFilter('code', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid size={2} className="item">
        <PublishedComponent
          pubRef="core.DatePicker"
          module="payroll"
          label={formatMessage('benefitConsumption.dateDue')}
          value={filterValue('dateDue')}
          onChange={(v) => onChangeFilters([
            {
              id: 'dateDue',
              value: v,
              filter: `dateDue: "${v}"`,
            },
          ])}
        />
      </Grid>
      <Grid size={2} className="item">
        <TextInput
          module="payroll"
          label="benefitConsumption.receipt"
          value={filterTextFieldValue('receipt')}
          onChange={onChangeStringFilter('receipt', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid size={2} className={classes.item}>
        <TextInput
          module="payroll"
          label="benefitConsumption.type"
          value={filterTextFieldValue('type')}
          onChange={onChangeStringFilter('type', CONTAINS_LOOKUP)}
        />
      </Grid>
      <Grid size={2} className="item">
        <BenefitConsumptionStatusPicker
          module="payroll"
          label={formatMessage('benefitConsumptions.status.label')}
          withNull
          nullLabel={formatMessage('tooltip.any')}
          value={filterValue('status')}
          onChange={(value) => onChangeFilters([
            {
              id: 'status',
              value,
              filter: `status: ${value}`,
            },
          ])}
        />
      </Grid>
      <Grid size={2} className="item">
        <NumberInput
          module="payroll"
          label={formatMessage('benefitConsumption.amount')}
          min={0}
          value={filterValue('amount')}
          onChange={onChangeFilter('amount')}
        />
      </Grid>
    </Grid>
    </StyledBenefitConsumptionFilter>
  );
}

export default BenefitConsumptionFilter;
