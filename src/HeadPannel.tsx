import './styles/HeadPannel.scss';

interface HeadPannelProps {
    balance: number;
}

function HeadPannel({ balance }: HeadPannelProps) {


    return (
        <header className='header'>
            <h1 className="header__h1">Your campaigns</h1>
            <span>Balance: ${balance}</span>
        </header>
    )
}

export default HeadPannel;