import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'

export interface InputProps {
	endAdornment?: React.ReactNode
	placeholder?: string
	startAdornment?: React.ReactNode
	value: any
	setValue?: Function
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	wethBalance?: BigNumber
}

const NestInput: React.FC<InputProps> = ({
	endAdornment,
	placeholder = '0',
	startAdornment,
	value,
	setValue,
	onChange,
	wethBalance,
}) => {
	return (
		<StyledInputWrapper>
			{!!startAdornment && startAdornment}
			<StyledInput
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				readOnly
			/>
			{wethBalance && setValue && (
				<>
					{/* <MaxButton
						onClick={() => {
							setValue(
								wethBalance
									.div(10 ** 18)
									.div(2)
									.toFixed(18),
							)
						}}
					>
						½
					</MaxButton>
					<MaxButton
						onClick={() => {
							setValue(wethBalance.div(10 ** 18).toFixed(18))
						}}
					>
						MAX
					</MaxButton> */}
				</>
			)}
			{!!endAdornment && endAdornment}
		</StyledInputWrapper>
	)
}

const StyledInputWrapper = styled.div`
	align-items: center;
	background: ${(props) => props.theme.color.transparent[100]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	height: 56px;
	padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
	background: none;
	border: 0;
	color: ${(props) => props.theme.color.text[100]};
	font-size: 1.25rem;
	flex: 1;
	height: 56px;
	margin: 0;
	padding: 0;
	outline: none;
	width: 60%;
`

export default NestInput
