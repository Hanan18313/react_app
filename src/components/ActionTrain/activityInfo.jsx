import React from 'react'
import ReactQMap from 'react-qmap'

export default class ActivityInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <ReactQMap
            center={{latitude: 30.53786, longitude: 104.07265}}
            initialOptions={{zoomControl: true, mapTypeControl: true }}
            apiKey='DVTBZ-RLYR5-ETNIN-QOPCP-T7IZ7-46FTG'
            style={{height:300, width:300}}
            ></ReactQMap>
        )
    }
}
