import { VFeeData } from '@/form-validator/VFeeData'
import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { useState } from 'react'

const prices: { [key: string]: number } = {
  beginner: 1000,
  intermediate: 2000,
  elite: 3000,
  private: 500,
  sauna: 1500,
  swimming: 500,
}

interface Cost {
  name?: string
  total: number
  trainingFee?: { amount: string; type: string }
  saunaSessions?: { amount: string; count: number }
  privateCoachingHours?: { amount: string; count: number }
  swimmingSessions?: { amount: string; count: number }
  currentWeight: number
  targetWeight: number
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VFeeData>({
    resolver: classValidatorResolver(VFeeData),
  })

  const [output, setOutput] = useState<Cost>()

  const onSubmit = (values: VFeeData) => {
    const cost: Cost = {
      total: 0,
      privateCoachingHours: { amount: '0', count: 0 },
      saunaSessions: { amount: '0', count: 0 },
      swimmingSessions: { amount: '0', count: 0 },
      currentWeight: 0,
      targetWeight: 0,
    }

    cost.trainingFee = {
      amount: (prices[values.plan] * 4).toFixed(2),
      type: values.plan,
    } // Assume a month consists of 4 weeks
    cost.total += +cost.trainingFee.amount
    cost.name = values.name
    cost.currentWeight = values.currentWeight
    cost.targetWeight = values.targetWeight

    if (values.saunaSessions) {
      cost.saunaSessions = {
        amount: (values.saunaSessions * prices.sauna).toFixed(2),
        count: values.saunaSessions,
      }
      cost.total += +cost.saunaSessions.amount
    }
    if (values.privateCoachingHours) {
      cost.privateCoachingHours = {
        amount: (values.privateCoachingHours * prices.private).toFixed(2),
        count: values.privateCoachingHours,
      }
      cost.total += +cost.privateCoachingHours?.amount
    }
    if (values.swimmingSessions) {
      cost.swimmingSessions = {
        amount: (values.swimmingSessions * prices.swimming).toFixed(2),
        count: values.swimmingSessions,
      }
      cost.total += +cost.swimmingSessions.amount
    }

    setOutput(cost)
  }

  return (
    <div className='container'>
      <h1>Best Fitness Fee Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Athlete name *</p>
          <input
            type='text'
            className={`${errors.name && 'error'}`}
            {...register('name')}
          />
        </label>
        <label>
          <p>Training plan (beginner/intermediate/elite) *</p>
          <select {...register('plan')} className={`${errors.plan && 'error'}`}>
            <option hidden defaultChecked>
              Select
            </option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='elite'>Elite</option>
          </select>
        </label>
        <div className='column'>
          <label>
            <p>Current weight (in kg) *</p>
            <input
              className={`${errors.currentWeight && 'error'}`}
              type='text'
              {...register('currentWeight')}
            />
          </label>
          <label>
            <p>Target weight (in kg) *</p>
            <input
              className={`${errors.targetWeight && 'error'}`}
              type='text'
              {...register('targetWeight')}
            />
          </label>
        </div>
        <label>
          <p>Private coaching hours</p>
          <input
            className={`${errors.privateCoachingHours && 'error'}`}
            type='text'
            {...register('privateCoachingHours')}
          />
        </label>
        <div className='column'>
          <label>
            <p>No. of sauna sessions</p>
            <input
              className={`${errors.saunaSessions && 'error'}`}
              type='text'
              {...register('saunaSessions')}
            />
          </label>
          <label>
            <p>No. of swimming sessions</p>
            <input
              className={`${errors.swimmingSessions && 'error'}`}
              type='text'
              {...register('swimmingSessions')}
            />
          </label>
        </div>
        <button className='submit'>Submit</button>
      </form>

      {output && (
        <div className='fee'>
          <h2>
            {output.name} Fee for the {new Date().getMonth() + 1}/
            {new Date().getFullYear()}
          </h2>
          <p className='weight-text'>
            {+output.currentWeight > +output.targetWeight
              ? 'You are overweight'
              : +output.currentWeight < +output.targetWeight
              ? 'You are underweight'
              : 'You reached your target weight'}
          </p>
          <div className='column'>
            <p>Training Fee</p>
            <h4>
              {output?.trainingFee?.amount} ({output?.trainingFee?.type})
            </h4>
          </div>
          <div className='column'>
            <p>Private Coaching Fee </p>
            <h4>
              {output?.privateCoachingHours?.count} x {prices.private} ={' '}
              {output?.privateCoachingHours?.amount}
            </h4>
          </div>
          <div className='column'>
            <p>Sauna Session Fee</p>
            <h4>
              {output?.saunaSessions?.count} x {prices.sauna} ={' '}
              {output?.saunaSessions?.amount}
            </h4>
          </div>
          <div className='column'>
            <p>Swimming Session fee</p>
            <h4>
              {output?.swimmingSessions?.count} x {prices.swimming} ={' '}
              {output?.swimmingSessions?.amount}
            </h4>
          </div>
          <hr />
          <div className='column'>
            <p>Total</p>
            <h4>{output?.total.toFixed(2)}</h4>
          </div>
        </div>
      )}
      <p className='footer'>Made with ❤️ by Raman Karki</p>
    </div>
  )
}
