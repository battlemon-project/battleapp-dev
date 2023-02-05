import { outfits, OutfitType } from "../helpers/dummyLemon";
import { useState } from "react";
import { lemonStore } from "../helpers/lemonStore";

function Inventory() {
  const { inventoryIsOpened, lemons, activePlatform } = lemonStore.getState();
  const allOutfits = Object.values(outfits).flat();
  const [ outfitList, setOutfitList ] = useState<OutfitType[]>(allOutfits)
  const [ currentTab, setCurrentTab ] = useState<string>('all')
  const [ description, setDescription ] = useState<boolean>(true)

  const filterOutifts = (type: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (type == 'all') {
      setOutfitList(allOutfits)
      setCurrentTab('all')
      setDescription(false)
    } else {
      setOutfitList(outfits[type])
      setCurrentTab(type)
      setDescription(false)
    }
  }

  const wearOutfit = (outfit: OutfitType) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newOutfitList = [...outfitList]
    newOutfitList.forEach(item => {
      item.active = item.name == outfit.name
    })
    setOutfitList(newOutfitList)
    lemonStore.setState((state) => ({ ...state, changeOutfit: outfit }))
  }
  
  const offOutfit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (currentTab == 'shoes' || currentTab == 'all') {
      return false;
    }
    const outfit: OutfitType = {
      name: null,
      type: currentTab
    }
    outfitList.forEach(item => {
      item.active = item.name == outfit.name
    })
    
    const newOutfitList = [...outfitList]
    newOutfitList.forEach(item => {
      item.active = item.name == outfit.name
    })
    setOutfitList(newOutfitList)
    lemonStore.setState((state) => ({ ...state, changeOutfit: outfit }))
  }

  lemonStore.subscribe((state, prevState) => {
    if (state.inventoryIsOpened != prevState.inventoryIsOpened) {
      setDescription(true)
      const newOutfitList = [...outfitList]
      newOutfitList.forEach(item => {
        item.active = false
      })
      setOutfitList(newOutfitList)
      setCurrentTab('all')
    }
  })

  return (
    <div className={`inventory-container d-flex ${inventoryIsOpened ? 'opened' : ''}`}>
      <div className={`inventory justify-content-center align-self-center w-100`}>
        <div className="d-flex mb-2 action-buttons">
          <a href='https://play.battlemon.com/home' rel="noreferrer" target="_blank" className="col col-auto d-flex">
            <span className='justify-content-center align-self-center text-center w-100' style={{color: '#000'}}>PLAY</span>
          </a>
          <a href={'#'} className="col col-auto d-flex">
            <span className='justify-content-center align-self-center text-center w-100' style={{color: '#000'}}>RENT</span>
          </a>
          <a href={'#'} className="col col-auto d-flex">
            <span className='justify-content-center align-self-center text-center w-100' style={{color: '#000'}}>SELL</span>
          </a>
          <a href={'#'} className="col col-auto d-flex">
            <span className='justify-content-center align-self-center text-center w-100' style={{color: '#000'}}>CHANGE</span>
          </a>
          <a href={'#'} className="col col-auto d-flex">
            <span className='justify-content-center align-self-center text-center w-100' style={{color: '#000'}}>SEND</span>
          </a>
        </div>

        <div className="inventory-center">
          {!description && <>
            <div className="inventory-left-buttons d-flex flex-column">
              
              <div className="col d-flex py-1" style={{height: '33.33%'}}>
                <a href={'#'} className={`button justify-content-center w-100 d-flex ${currentTab == 'all' && 'disabled'}`}>
                  <span className="justify-content-center align-self-center text-center w-100">
                    Mint
                    {currentTab != 'all' && <>
                      <br />
                      <span className="text-capitalize">{currentTab}</span>
                    </>}
                   </span>
                </a>
              </div>
              <div className="col d-flex py-1" style={{height: '33.33%'}}>
                <a href={'#'} className={`button justify-content-center w-100 d-flex ${currentTab == 'all' && 'disabled'}`} onClick={offOutfit}>
                  <span className="justify-content-center align-self-center text-center w-100">
                    Take Off
                    {currentTab != 'all' && <>
                      <br />
                      <span className="text-capitalize">{currentTab}</span>
                    </>}
                  </span>
                </a>
              </div>
              <div className="col d-flex py-1" style={{height: '33.33%'}}>
                <a href={'#'} className="button justify-content-center w-100 d-flex disabled">
                  <span className="justify-content-center align-self-center text-center w-100">Confirm</span>
                </a>
              </div>
            </div>
          </>}
          <div className="inventory-scroll">
            {description ? <>
              <div className="px-4 pb-2 pt-3">
                <h4>Brand New Lemon</h4>
                <h5>Characters:</h5>
                {lemons[activePlatform - 1].fields.traits.map(( trait: { fields: { flavour: string, name: string }}) => {
                  return <div key={trait.fields.name}>
                    <strong className='text-uppercase'>{trait.fields.name}</strong>:&nbsp;
                    {trait.fields.flavour.slice(0, -5).split('_').join(' ')}
                  </div>
                })}
              </div>
            </> : <>
              <div className="row">
                {outfitList.map(outfit => 
                  <div className={`col col-3 border px-1 px-1 ${outfit.active ? 'active' : ''}`} key={outfit.name}>
                    <div className="link" onClick={wearOutfit(outfit)} style={{cursor: 'pointer'}}>
                      <img src={`/assets/128/${outfit.name}_128.png`} className="img-fluid" />
                      {outfit.active && <div className="py-2 text-center buttons">
                        <button className="btn btn-sm btn-primary px-4 py-0">Edit</button>
                      </div>}
                    </div>
                  </div>
                )}
              </div>
            </>}
          </div>
        </div>
        <div className="position-relative">
          {!description && <>
            <div className="position-absolute" style={{left: '-130px'}}>
              <a className="position-relative" href={'#'} onClick={() => {setDescription(true)}}>
                <b className="position-absolute" style={{color: '#4a5480', padding: '19px 25px 0 40px', fontSize: '17px'}}>BACK</b>
                <img src="/assets/tiny/button_back_square_medium_a_128.png" style={{height: '64px'}} />
              </a>
            </div>
          </>}
          <div className="d-flex mt-2">
            <a className="col col-auto position-relative" href={'#'} onClick={filterOutifts('all')}>
              <b className="position-absolute" style={{color: '#4a5480', padding: '19px 15px 0 16px', fontSize: '17px'}}>ALL</b>
              <img src="/assets/tiny/icon_hand_empty.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={filterOutifts('cap')}>
              <img src="/assets/tiny/icon_cap_64.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={filterOutifts('cloth')}>
              <img src="/assets/tiny/icon_cloth_64.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={filterOutifts('face')}>
              <img src="/assets/tiny/icon_face_64.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={filterOutifts('shoes')}>
              <img src="/assets/tiny/icon_foot_64.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={filterOutifts('back')}>
              <img src="/assets/tiny/icon_back_128.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={() => {}}>
              <img src="/assets/tiny/icon_hand_l_64.png" />
            </a>
            <a className="col col-auto" href={'#'} onClick={filterOutifts('weapon')}>
              <img src="/assets/tiny/icon_hand_r_64.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;