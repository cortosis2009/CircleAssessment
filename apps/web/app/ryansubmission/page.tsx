"use client";


import type React from "react";
import { useState, useEffect } from 'react'
import { Heading } from "@packages/components/heading";
import { MostRecent } from "@feature/ryansubmission/mostrecent";
import { PaymentForm } from "@feature/ryansubmission/paymentform";
import { SearchPayments } from '@feature/ryansubmission/searchpayments'
import { Section } from "@packages/components/section";
import axios from "axios";
import * as DashboardTypes from '@feature/ryansubmission/types'
import { Link } from '@packages/components/link'

const Instructions: React.FC = () => {
  const [payments, setPayments] = useState(Array<DashboardTypes.sendPaymentInfo>);
  
  useEffect(() => {
    const getPaymentInterval = setInterval(() => {
      getPaymentData();
    }, 1250); //1.25 seconds

    return () => {
      clearInterval(getPaymentInterval); //cleanup
    };
  }, []);

  const getPaymentData = async () => {
    await axios.get("/api/payments")
      .then(response => {
        handlePaymentList(response.data.data);
      })
      .catch(err => {
        console.log("Error getting payments from /api/payments: " + err);
      })
  };

  const handlePaymentList = (newPayment: DashboardTypes.sendPaymentInfo) => {
    setPayments((prev) => {
      const exists = payments.some((payment) => payment.id === newPayment.id); //make sure this payment is new data
      if (!exists) {
        const newPaymentList = [...prev, newPayment];
        return newPaymentList;
      }
      return prev; //fall back for if the data already existed
    });
  };
  return (
    <main>
      <Section>
        <div className="bg-white pb-4">
          <Heading>
            <Heading.Label>Circle Internet Financial</Heading.Label>
            <Heading.Title>Payments Dashboard</Heading.Title>
         
          </Heading>
          
        </div>
        <Link href="/" variant="button">
          Return to homepage
        </Link>
      </Section>
      <section className="mx-auto bg-gray-900 px-6 py-16 lg:px-8 w-full " >

        <div className="flex flex-wrap justify-between">
          <MostRecent payments={payments}/>
          <SearchPayments payments={payments}/>
          <PaymentForm setPayments={handlePaymentList}/>
        </div>
      </section>
    </main>
  );
};

export default Instructions;
