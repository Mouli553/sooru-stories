import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSubtotal } from '../lib/pricing.ts';
const catalog=[{id:'a',pricePaise:7000,available:true},{id:'b',pricePaise:13000,available:true},{id:'x',pricePaise:900,available:false}];
test('subtotal uses catalogue prices',()=>assert.equal(calculateSubtotal([{productId:'a',quantity:2}],catalog),14000));
test('unavailable products are rejected',()=>assert.throws(()=>calculateSubtotal([{productId:'x',quantity:1}],catalog),/Product unavailable/));
test('duplicate lines are rejected',()=>assert.throws(()=>calculateSubtotal([{productId:'a',quantity:1},{productId:'a',quantity:2}],catalog),/Duplicate/));
test('invalid quantities are rejected',()=>assert.throws(()=>calculateSubtotal([{productId:'a',quantity:0}],catalog),/Quantity/));
test('unknown products are rejected',()=>assert.throws(()=>calculateSubtotal([{productId:'none',quantity:1}],catalog),/Product unavailable/));
