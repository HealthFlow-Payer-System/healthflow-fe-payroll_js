/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, {
  forwardRef,
} from 'react';

import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  useTranslations, useModulesManager,
} from '@openimis/fe-core';
import { MODULE_NAME } from '../constants';

const StyledPayrollPrintTemplate = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  fontWeight: '500',
  '& .topHeader': {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    '& img': {
      minWidth: '250px',
      maxWidth: '300px',
      width: 'auto',
      height: 'auto',
    },
  },
  '& .date': {
    fontSize: '16px',
  },
  '& .detailsContainer': {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    width: '100%',
  },
  '& .detailRow': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px',
  },
  '& .detailName': {
    fontWeight: '600',
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  '& .detailValue': {
    fontWeight: '500',
    backgroundColor: '#f5f5f5',
    padding: '6px',
    borderRadius: '8px',
    fontSize: '15px',
  },
  '& .containerPadding': {
    padding: '32px',
  },
  '& .dividerMargin': {
    margin: '12px 0',
  },
  '& .sectionTitle': {
    fontWeight: '700',
    fontSize: '18px',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
}));

const PayrollPrintTemplate = forwardRef(({ benefitConsumptions }, ref) => {
  if (!benefitConsumptions) return null;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(modulesManager, MODULE_NAME);

  return (
    <StyledPayrollPrintTemplate ref={ref}>
      {benefitConsumptions.map((benefitConsumption, index) => (
        <div key={index} className="detailsContainer">
          <div className="sectionTitle">
            {`Payment: ${benefitConsumption.code} - ${benefitConsumption.individual.firstName}, ${benefitConsumption.individual.lastName}`}
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.individual.firstName')}</div>
            <div className="detailValue">{benefitConsumption.individual.firstName}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.individual.lastName')}</div>
            <div className="detailValue">{benefitConsumption.individual.lastName}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.code')}</div>
            <div className="detailValue">{benefitConsumption.code}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.dateDue')}</div>
            <div className="detailValue">{benefitConsumption.dateDue}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.receipt')}</div>
            <div className="detailValue">{benefitConsumption.receipt}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.amount')}</div>
            <div className="detailValue">{benefitConsumption.amount}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.type')}</div>
            <div className="detailValue">{benefitConsumption.type}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.status')}</div>
            <div className="detailValue">{benefitConsumption.status}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.paymentDate')}</div>
            <div className="detailValue">
              {!benefitConsumption.receipt
                ? ''
                : benefitConsumption?.benefitAttachment[0]?.bill?.datePayed}
            </div>
          </div>
          <Divider className="dividerMargin" />
        </div>
      ))}
    </StyledPayrollPrintTemplate>
  );
});

export default PayrollPrintTemplate;
