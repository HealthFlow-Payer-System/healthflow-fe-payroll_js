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

const StyledPayrollBenefitPrintTemplate = styled('div')(() => ({
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

const PayrollBenefitPrintTemplate = forwardRef(({ benefitAttachments }, ref) => {
  if (!benefitAttachments) return null;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(modulesManager, MODULE_NAME);

  return (
    <StyledPayrollBenefitPrintTemplate ref={ref}>
      {benefitAttachments.map((benefitAttachment, index) => (
        <div key={index} className="detailsContainer">
          <div className="sectionTitle">
            {`Payment: ${benefitAttachment.benefit.code} - ${benefitAttachment.benefit.individual.firstName}, ${benefitAttachment.benefit.individual.lastName}`}
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.individual.firstName')}</div>
            <div className="detailValue">{benefitAttachment.benefit.individual.firstName}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.individual.lastName')}</div>
            <div className="detailValue">{benefitAttachment.benefit.individual.lastName}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.code')}</div>
            <div className="detailValue">{benefitAttachment.benefit.code}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.dateDue')}</div>
            <div className="detailValue">{benefitAttachment.benefit.dateDue}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.receipt')}</div>
            <div className="detailValue">{benefitAttachment.benefit.receipt}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.amount')}</div>
            <div className="detailValue">{benefitAttachment.benefit.amount}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.type')}</div>
            <div className="detailValue">{benefitAttachment.benefit.type}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.status')}</div>
            <div className="detailValue">{benefitAttachment.benefit.status}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.payedOnTime')}</div>
            <div className="detailValue">{benefitAttachment.benefit.payedOnTime ? 'Yes' : 'No'}</div>
          </div>
          <div className="detailRow">
            <div className="detailName">{formatMessage('payroll.benefitConsumption.paymentDate')}</div>
            <div className="detailValue">
              {!benefitAttachment.benefit.receipt
                ? ''
                : benefitAttachment?.bill?.datePayed}
            </div>
          </div>
          <Divider className="dividerMargin" />
        </div>
      ))}
    </StyledPayrollBenefitPrintTemplate>
  );
});

export default PayrollBenefitPrintTemplate;
