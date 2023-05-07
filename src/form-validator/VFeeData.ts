import { IsString, IsNotEmpty, Matches } from 'class-validator'

export class VFeeData {
  @IsString()
  @IsNotEmpty()
  name: string

  @Matches(/beginner|intermediate|elite/, { message: 'must select one' })
  plan: string

  // match integer or floating number
  @Matches(/^-?[1-9]*\d*\.?[1-9]+\d*(?=[1-9]$|$)/, {
    message: 'must be more than 0',
  })
  currentWeight: number

  @Matches(/^-?[1-9]*\d*\.?[1-9]+\d*(?=[1-9]$|$)/, {
    message: 'must be more than 0',
  })
  targetWeight: number

  @Matches(/^-?[1-9]*\d*\.?[1-9]*\d*(?=[1-9]$|$)/, {
    message: 'must be more than 0',
  })
  privateCoachingHours: number

  @Matches(/^-?[1-9]*\d*$/, {
    message: 'must be more than 0',
  })
  saunaSessions: number

  @Matches(/^-?[1-9]*\d*$/, {
    message: 'must be more than 0',
  })
  swimmingSessions: number
}
